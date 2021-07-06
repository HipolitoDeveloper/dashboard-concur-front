import * as Material from "@material-ui/core";
import * as S from "./styled";
import GlobalStyle from "../../../styles/global";
import Button from "../../atoms/Button";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useContext, useState } from "react";
import { db, storage } from "../../../services/firebase";
import PropTypes from "prop-types";
import ShowCaseHeader from "../ShowCaseHeader";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";
import { EventContext } from "../../../contexts/Event/EventContext";

const EventShowCaseModal = ({ isOpen, handleClose, showToast }) => {
  const { eventInView, loadEvents } = useContext(EventContext);

  const [loading, setLoading] = useState(false); //Implementar loading
  const [srcImage, setSrcImage] = useState("");
  const [showCaseImage, setShowCaseImage] = useState({});
  const [blob, setBlob] = useState("");
  const userFileNameImage = `images/${uuidv4()}-${blob.image}`;

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    reader.addEventListener(
      "load",
      async () => {
        const inputIemg = reader.result;
        setSrcImage(inputIemg);

        await createImage(inputIemg).then((img) => {
          canvas.width = 1920;
          canvas.height = 1080;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            setBlob(blob);
          }, "image/jpeg");
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  };

  const submitImage = useCallback((event) => {
    event.preventDefault();
    try {
      const uploadTask = storage
        .ref()
        .child(userFileNameImage)
        .put(blob, { contentType: blob.type });

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            eventInView.data.images.push({ image: downloadURL });

            db.collection("eventsCollection")
              .doc(eventInView.id)
              .update({ ...eventInView.data })
              .then(() => {
                loadEvents();
                cleanInformation();
                handleClose();
                showToast("success", "Imagem adicionada com sucesso");
              });
          });
        }
      );
    } catch (error) {
      loadEvents();
      cleanInformation();
      handleClose();
      showToast("error", "Não foi possível salvar a imagem");
    }
  });

  const cleanInformation = () => {
    setBlob("");
    setSrcImage("");
  };

  return (
    <div>
      <Material.Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <S.Container>
          <GlobalStyle />
          <S.Content onSubmit={submitImage}>
            <S.IconLogo />
            <S.ImageSpot>
              <S.ImageContent>
                <S.ImageInput
                  type="file"
                  accept="image/*"
                  id="fileElem"
                  onChange={handleImage}
                  required
                />
                {srcImage.length > 0 ? (
                  <>
                    <S.Image src={srcImage} alt="Imagem da vitrine" />
                  </>
                ) : (
                  <>
                    <S.ImageIcon />
                  </>
                )}
              </S.ImageContent>
            </S.ImageSpot>
            <Button
              backgroundColor="var(--color-yellow)"
              type="submit"
              width="200px"
              height="50px"
              name="submitButton"
              color="var(--color-white)"
              borderColor="var(--color-yellow)"
              text={"Adicionar foto"}
            />
          </S.Content>
        </S.Container>
      </Material.Modal>
    </div>
  );
};

export default EventShowCaseModal;

EventShowCaseModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  showToast: PropTypes.func,
};

EventShowCaseModal.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  showToast: () => {},
};
