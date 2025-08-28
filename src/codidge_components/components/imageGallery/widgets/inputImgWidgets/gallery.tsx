import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImageGallery } from "../..";
import { GallerySelection } from "../../interfaces";
import { ImageUp } from "lucide-react";
import { IImage } from "../../../../interfaces";
import Label from "../../../../UI/form/Label";
import TextButton from "../../../../UI/button/TextButton";
import Checkbox from "../../../../UI/form/input/Checkbox";
import OutlineButton from "../../../../UI/button/OutlineButton";
import { Modal } from "../../../../UI/modal";

interface ISingleImageProps {
  fieldName: string;
  fieldLabel: string;
}

export const CustomFieldGallery = ({
  fieldName,
  fieldLabel,
}: ISingleImageProps) => {
  const { control } = useFormContext();
  const [modal, setModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<IImage[]>([]);

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={[]}
      render={({ field }) => {
        const { value, onChange } = field;
        const images = value ?? [];
        const handleSelection = (selected: IImage[]) => {
          const newImages = selected.filter(
            (sel) => !images.some((img: IImage) => img.s3Key === sel.s3Key)
          );
          onChange([...images, ...newImages]);
          setModal(false);
        };

        const handleDeleteSelected = () => {
          const remaining = images.filter(
            (img: IImage) =>
              !selectedImg.some((sel: IImage) => sel.url === img.url)
          );
          onChange(remaining);
          setSelectedImg([]);
        };

        const toggleCheckbox = (img: IImage) => {
          setSelectedImg((prev) => {
            const exists = prev.some((i) => i.url === img.url);
            return exists
              ? prev.filter((i) => i.url !== img.url)
              : [...prev, img];
          });
        };

        return (
          <div>
            <Label>{fieldLabel}</Label>

            {selectedImg.length > 0 && (
              <div className="h-3 flex mb-2 items-center">
                <div className="w-full flex justify-end items-center">
                  <TextButton onClick={handleDeleteSelected}>Delete</TextButton>
                </div>
              </div>
            )}

            <div
              className={`grid gap-4 ${images.length > 0 ? "grid-cols-5" : ""}`}
            >
              {images.map((img: IImage, index: number) => (
                <div key={img.s3Key ?? index} className="relative">
                  <button
                    type="button"
                    className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl"
                    onClick={() => setModal(true)}
                  >
                    <img
                      className="h-full w-full object-contain"
                      src={img.url}
                      alt={img.alt}
                    />
                  </button>
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      className="border-gray-400 bg-white"
                      checked={selectedImg.some((i) => i.url === img.url)}
                      onChange={() => toggleCheckbox(img)}
                    />
                  </div>
                </div>
              ))}
              <OutlineButton
                className="h-24 !border-gray-200 !text-gray-400"
                type="button"
                onClick={() => setModal(true)}
              >
                <ImageUp />
              </OutlineButton>
            </div>

            <Modal
              className="m-10 h-[70vh] !w-3/4"
              isOpen={modal}
              onClose={() => setModal(false)}
            >
              <ImageGallery
                selection={GallerySelection.multipleSelection}
                showBottomPanel={true}
                onSubmit={handleSelection}
              />
            </Modal>
          </div>
        );
      }}
    />
  );
};
