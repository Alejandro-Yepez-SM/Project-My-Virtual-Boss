import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Eye, FileText, Image, Plus, Trash, Video } from "lucide-react";
import { getGalleryContent } from "./api/queries";
import {
  deleteImages,
  getImagesUploadUrl,
  insertGalleryItem,
} from "./api/mutations";
import {
  GallerySelection,
  IGalleryItem,
  IGalleryProps,
  MediaType,
} from "./interfaces";
import clsx from "clsx";
import { filterGalleryByTabSelection, getMediaType } from "./helper";
import { MediaItem } from "./widgets/mediaItem";
import { PreviewModal } from "./widgets/previewItemModal";
import { useTenant } from "../../../hooks/useTenant";
import { PageLoading } from "../../UI/loading/pageLoading";
import ComponentCard from "../ComponentCard";
import { TabsList } from "../../UI/tabs";
import PrimaryButton from "../../UI/button/PrimaryButton";
import { DropBox } from "./widgets/dropBox";
import OutlineButton from "../../UI/button/OutlineButton";
import TextButton from "../../UI/button/TextButton";
import { Modal } from "../../UI/modal";
import Checkbox from "../../UI/form/input/Checkbox";
import imageCompression from "browser-image-compression";

export const ImageGallery = ({
  selection,
  showBottomPanel,
  onCloseModal,
  onSubmit,
  allowDeletion,
}: IGalleryProps) => {
  const selectionProp = selection ?? GallerySelection.multipleSelection;
  const showBottomMenu = showBottomPanel ?? false;
  const allowDel = allowDeletion ?? false;

  const { tenantInfo, currentSolution } = useTenant();

  const [tabSelection, setTabSelection] = useState<MediaType>(MediaType.IMAGE);
  const [getPresignUrl] = useMutation(getImagesUploadUrl);

  const { data: galleryData, loading } = useQuery<{
    getGalleryContent: IGalleryItem[];
  }>(getGalleryContent, {
    variables: {
      tenant: {
        tenantId: tenantInfo!.id,
        solutionId: currentSolution,
      },
    },
  });

  const [deleteGalleryContent, { loading: loadingDeletion }] = useMutation(
    deleteImages,
    {
      update(cache, { data }) {
        if (!data.deleteGalleryContent) {
          return;
        }

        const existingGalleryItems = cache.readQuery<{
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

        if (existingGalleryItems?.getGalleryContent) {
          cache.writeQuery({
            query: getGalleryContent,
            variables: {
              tenant: {
                tenantId: tenantInfo!.id,
                solutionId: currentSolution,
              },
            },
            data: {
              getGalleryContent: existingGalleryItems?.getGalleryContent.filter(
                (imgGel: IGalleryItem) =>
                  !data.deleteGalleryContent.includes(imgGel.image.url)
              ),
            },
          });
        }
      },
    }
  );

  const [insertGalleryItemFn] = useMutation(insertGalleryItem, {
    update(cache, { data }) {
      if (!data.insertGalleryContent) {
        return;
      }

      const existingGalleryItems = cache.readQuery<{
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

      if (existingGalleryItems?.getGalleryContent) {
        cache.writeQuery({
          query: getGalleryContent,
          variables: {
            tenant: {
              tenantId: tenantInfo!.id,
              solutionId: currentSolution,
            },
          },
          data: {
            getGalleryContent: [
              ...data.insertGalleryContent,
              ...existingGalleryItems?.getGalleryContent,
            ],
          },
        });
      }
    },
  });

  const [uploading, setUploading] = useState(false);
  const [selectedImg, setSelectedImg] = useState<IGalleryItem[]>([]);
  const [seeDetails, setSeeDetails] = useState<IGalleryItem>();

  const onDropImage = async (acceptedFiles: File[]) => {
    const previewFiles = acceptedFiles.map((file) => ({
      file,
      tempUrl: URL.createObjectURL(file),
      alt: file.name,
      type: getMediaType(file),
    }));
    setUploading(true);

    const uploadedFiles = await Promise.all(
      previewFiles.map(async (fileData) => {
        try {
          let processedFile = fileData.file;

          // Compress only images
          if (fileData.type === MediaType.IMAGE) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };
            processedFile = await imageCompression(fileData.file, options);
          }

          const { data } = await getPresignUrl({
            variables: {
              tenant: {
                tenantId: tenantInfo!.id,
                solutionId: currentSolution,
              },
              imgInput: {
                filename: processedFile.name,
                type: processedFile.type,
                bucketPath: "gallery",
              },
            },
          });

          if (!data?.getImagesUploadUrl) {
            throw new Error("Missing presigned URL data");
          }

          const { uploadUrl, fileUrl } = data.getImagesUploadUrl;

          const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": processedFile.type,
            },
            body: processedFile,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload file to S3");
          }

          return {
            media: {
              image: {
                url: fileUrl,
                alt: processedFile.name,
                s3Key: uploadUrl.split("?")[0].split(".amazonaws.com/")[1],
              },
              type: fileData.type,
              filename: processedFile.name,
              size: processedFile.size,
              description: "",
            },
          };
        } catch (error) {
          console.error("Upload failed for file:", fileData.file.name, error);
          return {
            error: true,
            name: fileData.file.name,
          };
        }
      })
    );

    setUploading(false);

    await insertGalleryItemFn({
      variables: {
        tenant: {
          tenantId: tenantInfo!.id,
          solutionId: currentSolution,
        },
        data: uploadedFiles,
      },
    });
  };

  const sortedGalleryItems = galleryData?.getGalleryContent
    ? [...galleryData.getGalleryContent].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    : [];

  if (loading) {
    return <PageLoading />;
  }

  const filterByTabSelection = filterGalleryByTabSelection(
    sortedGalleryItems,
    tabSelection
  );

  return (
    <ComponentCard
      className="h-full !flex !flex-col"
      bodyClassName="flex-1"
      title="Content Gallery"
      rightWidget={
        <div className="flex items-center ml-auto gap-10">
          <TabsList
            tabs={[
              {
                name: "Image",
                tabClassName: "!flex items-center gap-2",
                icon: <Image size={16} />,
                onClick: () => {
                  setTabSelection(MediaType.IMAGE);
                },
                active: tabSelection === MediaType.IMAGE,
              },
              {
                name: "Video",
                tabClassName: "!flex items-center gap-2",
                icon: <Video size={16} />,
                onClick: () => {
                  setTabSelection(MediaType.VIDEO);
                },
                active: tabSelection === MediaType.VIDEO,
              },
              {
                name: "Document",
                tabClassName: "!flex items-center gap-2",
                icon: <FileText size={16} />,
                onClick: () => {
                  setTabSelection(MediaType.FILE);
                },
                active: tabSelection === MediaType.FILE,
              },
            ]}
          />
          <DropBox className="!w-auto" onDropImage={onDropImage}>
            <PrimaryButton
              type="button"
              className="h-[35px] min-w-[160px]"
              loading={uploading}
            >
              <Plus className="mr-2" /> Upload New
            </PrimaryButton>
          </DropBox>
        </div>
      }
      bottomWidget={
        showBottomMenu && (
          <div className="flex justify-end items-center gap-5">
            <OutlineButton
              type="button"
              onClick={() => {
                if (onCloseModal) {
                  onCloseModal();
                }
              }}
            >
              Cancel
            </OutlineButton>
            <PrimaryButton
              type="button"
              onClick={() => {
                if (onSubmit) {
                  onSubmit(selectedImg.map((img) => img.image));
                }
              }}
              disabled={selectedImg.length === 0}
            >
              Add
            </PrimaryButton>
          </div>
        )
      }
    >
      <div className="relative overflow-auto">
        <div className="flex gap-2">
          {selectedImg.length === 1 && (
            <TextButton
              loading={loadingDeletion}
              className="min-w-24 mb-3"
              onClick={async () => {
                setSeeDetails(selectedImg[0]);
              }}
            >
              <Eye size={16} className="mr-2" /> Preview
            </TextButton>
          )}
          {allowDel && selectedImg.length > 0 && (
            <TextButton
              loading={loadingDeletion}
              className="min-w-24 mb-3"
              onClick={async () => {
                const extractS3Keys = selectedImg.map((img) => img.image.url);
                await deleteGalleryContent({
                  variables: {
                    tenant: {
                      tenantId: tenantInfo!.id,
                      solutionId: currentSolution,
                    },
                    s3Keys: extractS3Keys,
                  },
                });
                setSelectedImg([]);
              }}
            >
              <Trash size={16} className="mr-2" />
              Delete
            </TextButton>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
          {filterByTabSelection?.map((gallery: IGalleryItem) => {
            const isChecked = selectedImg.some(
              (img) => img.image.url === gallery.image.url
            );

            const handleToggle = () => {
              if (selectionProp === GallerySelection.singleSelection) {
                setSelectedImg([gallery]);
              } else {
                if (isChecked) {
                  setSelectedImg((sel) =>
                    sel.filter((img) => img.image.url !== gallery.image.url)
                  );
                } else {
                  setSelectedImg((sel) => [...sel, gallery]);
                }
              }
            };

            return (
              <div
                key={gallery.image.s3Key}
                className={clsx(
                  "relative h-[150px] cursor-pointer rounded-xl overflow-hidden border-2 transition-all",
                  isChecked
                    ? "border-brand-500 dark:border-brand-400"
                    : "border-gray-200 dark:border-gray-800"
                )}
                onClick={handleToggle}
              >
                <MediaItem item={gallery} />

                <div
                  className="absolute top-2 left-2 z-10"
                  onClick={(e) => e.stopPropagation()} // Prevent checkbox click from triggering parent
                >
                  <Checkbox
                    className="border-gray-400 bg-white"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          className="!w-3/4"
          isOpen={!!seeDetails}
          onClose={() => {
            setSeeDetails(undefined);
          }}
        >
          <PreviewModal media={seeDetails!} />
        </Modal>
      </div>
    </ComponentCard>
  );
};
