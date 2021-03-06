import * as S from "./styled";
import ShowCaseHeader from "../../molecules/ShowCaseHeader";
import { db } from "../../../services/firebase";
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-dragswitch/dist/index.css";
import * as Icon from "@material-ui/icons";
import * as Material from "@material-ui/core";
import * as Lab from "@material-ui/lab";
import ShowCaseModal from "../../molecules/ShowCaseModal";
import { ShowCaseContext } from "../../../contexts/ShowCase/ShowCaseContext";
import AlertModal from "../../atoms/AlertModal";
import Select from "react-select";

const ShowCase = () => {
  const { showCaseInView, loadShowCase, deleteImageInShowCase } =
    useContext(ShowCaseContext);

  const [objImage, setObjImage] = useState({
    is_showing: false,
    is_redirecting: false,
    image: "",
    index: 0,
  });
  const [isShowCaseModalOpen, setIsShowCaseModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const [toast, setToast] = useState({});

  const setImage = async (imageIndex, changeRequested, value) => {
    await loadShowCase(null, updateImage);

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
              newObjImage.id = image.id;
              setObjImage({ ...newObjImage });
            })
            .catch((e) => {
              console.log(e);
              alert("Tratar erro update show case");
            });
        }
      });
    }
  };

  const handleShowCaseModal = () => {
    setIsShowCaseModalOpen(!isShowCaseModalOpen);
  };

  const handleAlertModal = async () => {
    await setImage(objImage.index, null, null);
    setIsAlertModalOpen(!isAlertModalOpen);
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

  const deleteImage = async () => {
    db.collection(showCaseInView.collection)
      .doc(objImage.id)
      .delete()
      .then(() => {
        deleteImageInShowCase(objImage);
        setObjImage({
          is_showing: false,
          is_redirecting: false,
          image: "",
          index: 0,
        });
        setIsAlertModalOpen(!isAlertModalOpen);
        showToast("success", "A imagem foi exclu??da com sucesso");
      })
      .catch((error) => {
        console.log(error);
        alert("Tratar erro delete show case");
      });
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
          <h6>Ativar redirecionamento autom??tico</h6>
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
        <S.BottomItem type="button" onClick={handleAlertModal}>
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
          onClick={handleShowCaseModal}
        >
          <Icon.Add style={{ color: "var(--color-white" }} />
        </Material.Fab>
      </S.FabButton>

      <ShowCaseModal
        isOpen={isShowCaseModalOpen}
        handleClose={handleShowCaseModal}
        showToast={showToast}
      />

      <AlertModal
        isOpen={isAlertModalOpen}
        handleClose={handleAlertModal}
        description={"Deseja mesmo excluir essa imagem da vitrine?"}
        title={"Aten????o"}
        handleOk={deleteImage}
      />
    </S.Container>
  );
};
export default ShowCase;
