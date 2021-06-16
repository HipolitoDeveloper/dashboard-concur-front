import * as S from "./styled";
import { useContext, useEffect, useState } from "react";
import * as Icon from "@material-ui/icons";

import * as Material from "@material-ui/core";
import { BlogContext } from "../../../contexts/Blog/BlogContext";
import GlobalStyle from "../../../styles/global";

const HeaderItems = [
  { nome: "Vídeo" },
  { nome: "TÍTULO" },
  { nome: "CHAT" },
  { nome: "DISPONIBILIDADE" },
  { nome: "EDITAR" },
];

const PostList = ({ history }) => {
  const { posts, loadPosts, updatePost } = useContext(BlogContext);
  const [postList, setPostList] = useState(posts);

  useEffect(() => {
    const getPosts = async () => {
      await loadPosts();
      console.log(posts);
    };
    getPosts();
  }, []);

  const handleChange = (index) => {
    const newVideoList = postList.map((post, i) => {
      if (index === i) {
        post.data.active = !post.data.active;
        updatePost(post);
      }
      return post;
    });
    setPostList(newVideoList);
  };

  const renderHeader = HeaderItems.map((item) => (
    <Material.TableCell key={item.nome}>
      <S.HeaderTitle>{item.nome}</S.HeaderTitle>
    </Material.TableCell>
  ));

  const renderPosts = postList?.map((post, index) => (
    <Material.TableRow key={post?.id}>
      <Material.TableCell component="th" scope="row">
        <S.ThumbnailContent>
          {post?.data?.image === undefined ? (
            <S.ImageSpot />
          ) : (
            <S.Image src={post?.data?.image} alt="Imagem do post" />
          )}
        </S.ThumbnailContent>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.Title>{post?.data?.title}</S.Title>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.SubTitle>{post?.data?.subtitle}</S.SubTitle>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.SubTitle>{post?.data?.description}</S.SubTitle>
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <Material.Switch
          checked={post?.data?.active}
          onChange={() => handleChange(index)}
          color="primary"
          name="active"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.EditIcon>
          {" "}
          <Icon.Edit style={{ color: "var(--color-yellow)" }} />
        </S.EditIcon>
      </Material.TableCell>
    </Material.TableRow>
  ));

  return (
    <S.Container>
      <GlobalStyle />
      <Material.Table>
        <Material.TableHead>
          <Material.TableRow>{renderHeader}</Material.TableRow>
        </Material.TableHead>
        <Material.TableBody>{renderPosts}</Material.TableBody>
      </Material.Table>

      <S.FabButton>
        <Material.Fab
          aria-label="add"
          style={{ backgroundColor: "var(--color-yellow" }}
          onClick={() => history.push("/post/criador")}
        >
          <Icon.Add style={{ color: "var(--color-white" }} />
        </Material.Fab>
      </S.FabButton>
    </S.Container>
  );
};

export default PostList;
