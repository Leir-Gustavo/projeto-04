import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/delete-icon.svg";
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import ConfirmModal from "../ConfirmModal";
import './styles.css';


function Card({ data, allProducts }) {
    const navigate = useNavigate();
    const { setCurrentProduct, currentProduct, token, addProducts, setAddProducts } = useGlobalContext();
    const [open, setOpen] = useState();

    async function handleClose() {
        try {
            const response = await api.delete(`/produtos/${data.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.status > 204) {
                return;
            }

            const localProducts = [...addProducts]
            const productToDeleteIndex = localProducts.findIndex((p) => p.id === data.id)
            localProducts.splice(productToDeleteIndex, 1)
            setAddProducts([...localProducts])

        } catch (error) {
            console.log(error)
        } finally {
            setOpen(false)
        }

    }

    function handleConfirm() {
        setOpen(false)
    }

    function handleDeleteProduct() {
        setOpen(true)
    }

    function handleEditProduct() {
        setCurrentProduct(data);
        navigate('/edit-products');
    }



    return (
        <>
            <div className="card">
                <img
                    src={DeleteIcon}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => handleDeleteProduct()}
                >
                </img>
                <div onClick={handleEditProduct}>
                    <img className="background-image" src={data.imagem} alt="card"></img>
                    <h3>{data.nome}</h3>
                    <p>{data.descricao}</p>
                    <div className="price">
                        <p>{data.estoque} Unidades</p>
                        <p>R$ {data.preco}</p>
                    </div>

                </div>
                <ConfirmModal
                    open={open}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                    title="Remover produto do catálogo?"
                    subTitle="Esta ação não poderá ser desfeita"
                    textBtnConfirm="MANTER PRODUTO"
                    textBtnCancel="REMOVER"
                >

                </ConfirmModal>
            </div>
        </>


    )
}

export default Card;