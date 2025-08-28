import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImageGallery } from "../..";
import { GallerySelection } from "../../interfaces";
import { ImageUp, X } from "lucide-react";
import Label from "../../../../UI/form/Label";
import OutlineButton from "../../../../UI/button/OutlineButton";
import { IImage } from "../../../../interfaces";
import { Modal } from "../../../../UI/modal";
import IconButton from "../../../../UI/button/IconButton";

interface ISingleImageProps {
  fieldName: string;
  fieldLabel: string;
  className?: string;
}

export const SingleImage = ({
  fieldName,
  fieldLabel,
  className,
}: ISingleImageProps) => {
  const { control } = useFormContext();
  const [modal, setModal] = useState(false);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const { value: image, onChange } = field;

        const handleSelect = (selected: IImage[]) => {
          onChange(selected[0]);
          setModal(false);
        };

        return (
          <div className={`${className}`}>
            <Label>{fieldLabel}</Label>

            {image ? (
              <div className="relative w-fit">
                <OutlineButton
                  type="button"
                  className="relative flex h-20 item-center justify-center overflow-hidden rounded-xl"
                  onClick={() => setModal(true)}
                >
                  <img
                    className="h-full w-full object-contain"
                    src={image.url}
                    alt={image.alt}
                  />
                </OutlineButton>
                <IconButton
                  icon={<X />}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(null);
                  }}
                  className="absolute z-10 hover:bg-gray-100 !p-0 !m-0 top-1 right-1"
                />
              </div>
            ) : (
              <OutlineButton
                className="w-full h-24 !border-gray-200 !text-gray-400"
                type="button"
                onClick={() => setModal(true)}
              >
                <ImageUp />
              </OutlineButton>
            )}

            <Modal
              className="m-10 h-[85vh] !w-3/4"
              isOpen={modal}
              onClose={() => setModal(false)}
            >
              <ImageGallery
                selection={GallerySelection.singleSelection}
                showBottomPanel={true}
                onSubmit={handleSelect}
              />
            </Modal>
          </div>
        );
      }}
    />
  );
};
