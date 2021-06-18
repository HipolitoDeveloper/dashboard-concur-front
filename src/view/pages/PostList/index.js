import * as S from "./styled";
import { useContext, useEffect, useState } from "react";
import * as Icon from "@material-ui/icons";

import * as Material from "@material-ui/core";
import { BlogContext } from "../../../contexts/Blog/BlogContext";
import GlobalStyle from "../../../styles/global";

const HeaderItems = [
  { nome: "Vídeo" },
  { nome: "TÍTULO" },
  { nome: "SUBTÍTULO" },
  { nome: "DESCRIÇÃO" },
  { nome: "ATIVO" },
  { nome: "EDITAR" },
];

const PostList = ({ history }) => {
  const { posts, loadPosts, updatePost, setPostInView, deletePost } =
    useContext(BlogContext);

  useEffect(() => {
    const getPosts = async () => {
      await loadPosts();
    };
    getPosts();
  }, []);

  const handleChange = (post) => {
    updatePost({ post: post, updateStatus: true });
  };

  const handleEdit = async (post) => {
    await setPostInView(post);
    history.push("/post/criador");
  };

  const handleDelete = async (post) => {
    await deletePost(post);

    setTimeout(() => {
      loadPosts();
      //Implementar loading
    }, 1000);
  };

  const renderHeader = HeaderItems.map((item) => (
    <Material.TableCell key={item.nome}>
      <S.HeaderTitle>{item.nome}</S.HeaderTitle>
    </Material.TableCell>
  ));

  const renderPosts = posts?.map((post, index) => (
    <Material.TableRow key={post?.id}>
      <Material.TableCell component="th" scope="row">
        <S.DeleteButton type={"button"} onClick={() => handleDelete(post)}>
          <Icon.Delete style={{ color: "var(--color-white)", fontSize: 25 }} />
        </S.DeleteButton>
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
          onChange={() => handleChange(post)}
          color="primary"
          name="active"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Material.TableCell>
      <Material.TableCell component="th" scope="row">
        <S.EditIcon onClick={() => handleEdit(post)}>
          <Icon.Edit style={{ color: "var(--color-yellow)" }} />
        </S.EditIcon>
      </Material.TableCell>
    </Material.TableRow>
  ));

  return (
    <S.Container>
      <GlobalStyle />
      <S.Content>
        <Material.Table stickyHeader>
          <Material.TableHead>
            <Material.TableRow>{renderHeader}</Material.TableRow>
          </Material.TableHead>
          <Material.TableBody>{renderPosts}</Material.TableBody>
        </Material.Table>
      </S.Content>

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
