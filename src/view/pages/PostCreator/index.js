import * as S from "./styled";
import Input from "../../atoms/Input";
import { useContext, useEffect, useState } from "react";
import Button from "../../atoms/Button";
import * as Icon from "@material-ui/icons";
import { BlogContext } from "../../../contexts/Blog/BlogContext";

const PostCreator = ({ history }) => {
  const { postInView, savePost, clearPostInView, updatePost } =
    useContext(BlogContext);
  const [objPost, setObjPost] = useState({ ...postInView.data });

  useEffect(() => {}, []);

  const handleChange = (input) => {
    const { value } = input.target;

    setObjPost({
      ...objPost,
      [input.target.name]: value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    reader.addEventListener(
      "load",
      async () => {
        objPost.image = reader.result;
        setObjPost({ ...objPost });

        await createImage(objPost.image).then((img) => {
          canvas.width = 1920;
          canvas.height = 1080;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            objPost.blob = blob;
            setObjPost({ ...objPost });
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

  const sendPostObj = async (event) => {
    event.preventDefault();
    if (Object.keys(postInView).length !== 0) {
      updatePost({
        post: { id: postInView.id, data: objPost },
        updateStatus: false,
      });
      setTimeout(() => {
        clearPostInView();
        history.push("/posts");
        //Implementar loading
      }, 3000);
    } else {
      await savePost(objPost).then(() => {
        setTimeout(() => {
          history.push("/posts");
          //Implementar loading
        }, 3000);
      });
    }
  };

  return (
    <S.Container>
      <S.BackButton
        type={"button"}
        onClick={async () => {
          await clearPostInView();
          history.goBack();
        }}
      >
        <Icon.ArrowBack style={{ color: "var(--color-black)", fontSize: 30 }} />
      </S.BackButton>
      <S.Content>
        <S.ImageSpot>
          <S.ImageContent>
            <S.ImageInput
              type="file"
              accept="image/*"
              id="fileElem"
              onChange={handleImage}
              required
            />
            {objPost.image !== null ? (
              <>
                <S.Image src={objPost.image} alt="Imagem da vitrine" />
              </>
            ) : (
              <>
                <Icon.CloudUpload
                  style={{ color: "var(--color-yellow)", fontSize: 60 }}
                />
              </>
            )}
          </S.ImageContent>
        </S.ImageSpot>
        <S.PostForm onSubmit={(event) => sendPostObj(event)}>
          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="title"
            value={objPost.title}
            placeholder="Digite o título do post..."
            required={true}
          />

          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="subtitle"
            value={objPost.subtitle}
            placeholder="Digite o subtítulo do post..."
            required={true}
          />

          <Input
            isFromLogin={false}
            type="text"
            onChange={handleChange}
            name="description"
            value={objPost.description}
            placeholder="Digite a descrição do post..."
            required={true}
          />

          <S.SubmitButton>
            {Object.keys(postInView).length !== 0 ? (
              <Button
                backgroundColor="var(--color-white)"
                type="submit"
                width="40%"
                height="50px"
                name="submitButton"
                color="var(--color-yellow)"
                borderColor="var(--color-yellow)"
                text={"Editar postagem"}
              />
            ) : (
              <Button
                backgroundColor="var(--color-white)"
                type="submit"
                width="40%"
                height="50px"
                name="submitButton"
                color="var(--color-yellow)"
                borderColor="var(--color-yellow)"
                text={"Salvar postagem"}
              />
            )}
          </S.SubmitButton>
        </S.PostForm>
      </S.Content>
    </S.Container>
  );
};

export default PostCreator;
