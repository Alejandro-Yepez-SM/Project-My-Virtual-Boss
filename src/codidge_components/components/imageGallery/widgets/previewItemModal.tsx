import React, { useState } from "react";
import { Download, Edit3, Save, FileText, Video, Image } from "lucide-react";
import { IGalleryItem, IPreviewModalProps, MediaType } from "../interfaces";
import { CopyButton } from "./copyLinkButton";
import { useMutation } from "@apollo/client";
import { updateGalleryItem } from "../api/mutations";
import { getGalleryContent } from "../api/queries";
import { useTenant } from "../../../../hooks/useTenant";
import TextButton from "../../../UI/button/TextButton";
import OutlineButton from "../../../UI/button/OutlineButton";
import PrimaryButton from "../../../UI/button/PrimaryButton";

export const PreviewModal: React.FC<IPreviewModalProps> = ({ media }) => {
  const { tenantInfo, currentSolution } = useTenant();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    alt: media.image.alt,
    description: media.description || "",
  });

  const [updateGalleryItemFn, { loading }] = useMutation<{
    updateGalleryItem: IGalleryItem;
  }>(updateGalleryItem, {
    update(cache, { data }) {
      const updatedGalleryItem = data?.updateGalleryItem;
      if (!updatedGalleryItem) return;

      const existingGalleryList = cache.readQuery<{
        getGalleryContent: IGalleryItem[];
      }>({
        query: getGalleryContent,
        variables: {
          tenant: {
            tenantId: tenantInfo!.id,
            solutionId: currentSolution,
          },
        },
      });

      if (existingGalleryList?.getGalleryContent) {
        cache.writeQuery({
          query: getGalleryContent,
          variables: {
            tenant: {
              tenantId: tenantInfo!.id,
              solutionId: currentSolution,
            },
          },
          data: {
            getGalleryContent: existingGalleryList.getGalleryContent.map(
              (gal: IGalleryItem) =>
                gal._id === updatedGalleryItem._id ? updatedGalleryItem : gal
            ),
          },
        });
      }
    },
  });

  const handleSave = async () => {
    try {
      const { data } = await updateGalleryItemFn({
        variables: {
          data: {
            filename: editData.alt,
            description: editData.description,
          },
          galleryItemId: media._id,
          tenant: {
            tenantId: tenantInfo!.id,
            solutionId: currentSolution,
          },
        },
      });

      if (data?.updateGalleryItem) {
        setEditData({
          alt: data.updateGalleryItem.filename,
          description: data.updateGalleryItem.description,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.log("::error updating");
      setIsEditing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = media.image.url;
    link.download = media.filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = () => {
    switch (media.type) {
      case MediaType.IMAGE:
        return <Image className="w-6 h-6" />;
      case MediaType.VIDEO:
        return <Video className="w-6 h-6" />;
      case MediaType.FILE:
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const height = "max-h-[45vh]";

  const renderMediaContent = () => {
    switch (media.type) {
      case MediaType.IMAGE:
        return (
          <img
            src={media.image.url}
            alt={media.image.alt}
            className={`max-w-full ${height} object-contain rounded-lg`}
          />
        );
      case MediaType.VIDEO:
        return (
          <video
            src={media.image.url}
            controls
            className={`max-w-full max-h-[50vh] rounded-lg`}
          >
            Your browser does not support the video tag.
          </video>
        );
      case MediaType.FILE:
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FileText className="w-20 h-20 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {media.filename || "Unknown file"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {media.size ? `${(media.size / 1024 / 1024).toFixed(2)} MB` : ""}
            </p>
          </div>
        );
      default:
        return (
          <img
            src={media.image.url}
            alt={media.image.alt}
            className={`max-w-full ${height} object-contain rounded-lg`}
          />
        );
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {getFileIcon()}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Media Preview
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton url={media.image.url} />
          <TextButton onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </TextButton>
          <TextButton onClick={() => setIsEditing((edi) => !edi)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </TextButton>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Media Display */}
        <div className="max-h-[75vh] overflow-y-scroll">
          <div className="flex justify-center mb-6">{renderMediaContent()}</div>

          {/* Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Text / Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.alt}
                  onChange={(e) =>
                    setEditData({ ...editData, alt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {media.image.alt}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a description..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {media.description || "No description"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <span className="font-medium">File Size:</span>{" "}
                {media.size
                  ? `${(media.size / 1024 / 1024).toFixed(2)} MB`
                  : "Unknown"}
              </div>
              <div>
                <span className="font-medium">Type:</span> {media.type}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <OutlineButton onClick={() => setIsEditing(false)}>
              Cancel
            </OutlineButton>
            <PrimaryButton disabled={loading} onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
