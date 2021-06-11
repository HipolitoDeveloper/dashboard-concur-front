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
import { CarouselContainer, CarouselContent, ImageContent } from "./styled";

const ShowCase = () => {
  const { showCases, showCaseInView, chooseShowCase } =
    useContext(ShowCaseContext);

  const [objImage, setObjImage] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => {
    chooseShowCase(0);
  }, []);

  const changeRedirect = (value) => {
    objImage.is_redirecting = value;
    setObjImage({ ...objImage });
  };

  const changeShow = (value) => {
    objImage.is_showing = value;
    setObjImage({ ...objImage });
  };

  const setImage = (imageIndex) => {
    showCaseInView.images.forEach((image, index) => {
      if (imageIndex === index) {
        setObjImage(image);
      }
    });
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
    // loadShowCase();
    console.log(showCaseInView);
  };

  const renderImages = showCaseInView.images?.map((image) => (
    <S.ImageContent key={image.image}>
      <img src={image.image} alt="Imagem da vitrine" />
    </S.ImageContent>
  ));

  return (
    <S.Container>
      <ShowCaseHeader collection={showCaseInView} />

      {toast.showingToast && (
        <Lab.Alert severity={toast.severity}>{toast.text}</Lab.Alert>
      )}
      <S.Content>
        <S.CarouselContainer>
          <Carousel
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
            defaultChecked
            defaultValue={false}
            checked={objImage.is_redirecting}
            icon={
              <Icon.DoneOutlineRounded
                style={{ color: "var(--color-yellow)" }}
              />
            }
            checkedIcon={<Icon.Done style={{ color: "var(--color-yellow)" }} />}
            name="redirecting"
            onChange={() => {
              changeRedirect(!objImage.is_redirecting);
            }}
          />
        </S.BottomItem>
        <S.BottomItem type="button" onClick={deleteImage}>
          <Icon.Delete className={"delete-button"} />
        </S.BottomItem>
        <S.BottomItem>
          <h6>Disponibilizar imagem na vitrine</h6>
          <Material.Checkbox
            defaultChecked
            defaultValue={false}
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
              changeShow(!objImage.is_showing);
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
