import * as S from "./styled";
import ShowCaseHeader from "../../molecules/ShowCaseHeader";
import { db } from "../../../services/firebase";
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DragSwitch } from "react-dragswitch"; // requires a loader
import "react-dragswitch/dist/index.css";
import * as Icon from "@material-ui/icons";
import * as Material from "@material-ui/core";
import * as Lab from "@material-ui/lab";
import ShowCaseModal from "../../atoms/ShowCaseModal";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";

const ShowCase = () => {
  const { showCaseInView, loadShowCase } = useContext(ShowCaseContext);

  const [objImage, setObjImage] = useState({
    is_showing: false,
    is_redirecting: false,
    image: "",
    index: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({});

  const setImage = async (imageIndex, changeRequested, value) => {
    loadShowCase(null, updateImage);

    function updateImage(newShowCaseInView) {
      if (imageIndex === 0 && objImage.index === undefined) {
        imageIndex = 0;
      }

      let newObjImage = {};

      newShowCaseInView.images?.map((image, index) => {
        if (imageIndex === index) {
          newObjImage = image.data;
          switch (changeRequested) {
            case "SHOW":
              newObjImage.is_showing = value;
              break;
            case "REDIRECT":
              newObjImage.is_redirecting = value;
              break;
          }
          db.collection(newShowCaseInView.collection)
            .doc(image.id)
            .update({ ...newObjImage })
            .then(() => {
              newObjImage.index = index;
              setObjImage({ ...newObjImage });
            })
            .catch((e) => {
              alert("ERRO", "Não foi possível salvar a alteração na vitrine");
            });
        }
      });
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const showToast = (severity, text) => {
    toast.severity = severity;
    toast.text = text;
    toast.showingToast = true;
    setTimeout(() => {
      toast.severity = "";
      toast.text = "";
      toast.showingToast = false;
      setToast({ ...toast });
    }, 5000);

    setToast({ ...toast });
  };

  const deleteImage = () => {
    console.log(showCaseInView);
  };

  const renderImages = showCaseInView.images?.map((image) => (
    <S.ImageContent key={image.data.image}>
      <img src={image.data.image} alt="Imagem da vitrine" />
    </S.ImageContent>
  ));

  return (
    <S.Container>
      <ShowCaseHeader onChange={setImage} />

      {toast.showingToast && (
        <Lab.Alert severity={toast.severity}>{toast.text}</Lab.Alert>
      )}
      <S.Content>
        <S.CarouselContainer>
          <Carousel
            selectedItem={objImage.index}
            onChange={setImage}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            centerSlidePercentage={"30%"}
          >
            {renderImages}
          </Carousel>
        </S.CarouselContainer>
      </S.Content>
      <S.Bottom>
        <S.BottomItem>
          <h6>Ativar redirecionamento automático</h6>
          <Material.Checkbox
            checked={objImage.is_redirecting}
            icon={
              <Icon.DoneOutlineRounded
                style={{ color: "var(--color-yellow)" }}
              />
            }
            checkedIcon={<Icon.Done style={{ color: "var(--color-yellow)" }} />}
            name="redirecting"
            onChange={() => {
              setImage(objImage.index, "REDIRECT", !objImage.is_redirecting);
            }}
          />
        </S.BottomItem>
        <S.BottomItem type="button" onClick={deleteImage}>
          <Icon.Delete className={"delete-button"} />
        </S.BottomItem>
        <S.BottomItem>
          <h6>Disponibilizar imagem na vitrine</h6>
          <Material.Checkbox
            checked={objImage.is_showing}
            icon={
              <Icon.RemoveRedEyeOutlined
                style={{ color: "var(--color-yellow)" }}
              />
            }
            checkedIcon={
              <Icon.RemoveRedEye style={{ color: "var(--color-yellow)" }} />
            }
            name="redirecting"
            onChange={() => {
              setImage(objImage.index, "SHOW", !objImage.is_showing);
            }}
          />
        </S.BottomItem>
      </S.Bottom>

      <S.FabButton>
        <Material.Fab
          aria-label="add"
          style={{ backgroundColor: "var(--color-yellow" }}
          onClick={handleModal}
        >
          <Icon.Add style={{ color: "var(--color-white" }} />
        </Material.Fab>
      </S.FabButton>

      <ShowCaseModal
        isOpen={isOpen}
        handleClose={handleModal}
        showToast={showToast}
      />
    </S.Container>
  );
};
export default ShowCase;
