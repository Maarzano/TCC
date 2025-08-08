import styled from "styled-components";
import { useCart } from "../../../Context/Cart";
import { CriarMovimentacao } from "../../../Services/movimentacaoService";
import { editarProdutoPorId, buscarProdutoPorId } from "../../../Services/prudutoService";

const SummaryModal = ({isOpen, onClose, onConfirm = () => {}, tipo, responsavel,}) => {
  const { cartItems, clearCart } = useCart();

  if (!isOpen) return null;

  const dataHoraAtual = new Date();
  const dataFormatada = dataHoraAtual.toLocaleDateString();
  const horaFormatada = dataHoraAtual.toLocaleTimeString();

  const handleConfirm = async () => {
    try {
      const obj = {
        "funcionarioId": responsavel.id,
        "tipoMovimentacao": tipo,
        "itens": cartItems.map(item => ({
          IdItem: item.itemId,
          quantidade: item.quantity
        }))
      };
      
      await CriarMovimentacao(obj);

      if (tipo === "SAIDA" || tipo === "ENTRADA") {
        for (const item of cartItems) {
          try {
            const produtoAtual = await buscarProdutoPorId(item.itemId);
            
            if (!produtoAtual || produtoAtual.quantidade === undefined) {
              continue;
            }
            
            let novaQuantidade;
            
            if (tipo === "SAIDA") {
              novaQuantidade = produtoAtual.quantidade - item.quantity;
              if (novaQuantidade < 0) {
                novaQuantidade = 0;
              }
            } else if (tipo === "ENTRADA") {
              novaQuantidade = produtoAtual.quantidade + item.quantity;
            }
            if (novaQuantidade !== undefined) {
              const dadosAtualizados = {
                nomeItem: produtoAtual.nomeItem,
                quantidade: novaQuantidade,
                descricao: produtoAtual.descricao || "",
                imagem: produtoAtual.imagem || ""
              };
              await editarProdutoPorId(item.itemId, dadosAtualizados);
            }
          } catch (error) {
            console.error(`❌ Erro ao atualizar ${item.nomeItem}:`, error);
            console.error("Detalhes do erro:", error.response?.data || error.message);
          }
        }
      }

      clearCart();
      onConfirm();
      onClose();
    } catch (error) {
      console.error("❌ Erro geral no processamento:", error);
      alert("Erro ao processar a movimentação. Verifique o console para mais detalhes.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Resumo da {tipo}</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            ×
          </CloseButton>
        </Header>

        <Content>
          <Field>
            <Label>Responsável:</Label> <Value>{responsavel.nome}</Value>
          </Field>
          <Field>
            <Label>Tipo de Ação:</Label> <Value>{tipo}</Value>
          </Field>
          <Field>
            <Label>Data:</Label> <Value>{dataFormatada}</Value>
          </Field>
          <Field>
            <Label>Hora:</Label> <Value>{horaFormatada}</Value>
          </Field>

          <Field>
            <Label>Itens:</Label>
            {cartItems.length > 0 ? (
              <ItemList>
                {cartItems.map((item) => (
                  <Item key={item.itemId}>
                    <ItemName>{item.nomeItem}</ItemName> —{" "}
                    <ItemQuantity>Quantidade: {item.quantity}</ItemQuantity>
                  </Item>
                ))}
              </ItemList>
            ) : (
              <Empty>Nenhum item selecionado.</Empty>
            )}
          </Field>

          <Confirmation>
            Você tem certeza que deseja realizar a{" "}
            <strong>{tipo.toLowerCase()}</strong> dos itens{" "}
            <strong>{responsavel.nome}</strong>?
            {tipo === "SAIDA" && (
              <WarningText $type="saida">
                ⚠️ Esta ação irá reduzir o estoque dos produtos retirados.
              </WarningText>
            )}
            {tipo === "ENTRADA" && (
              <WarningText $type="entrada">
                ✅ Esta ação irá aumentar o estoque dos produtos devolvidos.
              </WarningText>
            )}
          </Confirmation>
        </Content>

        <Footer>
          <ButtonCancelar onClick={onClose}>Cancelar</ButtonCancelar>
          <ButtonConfirmar
            disabled={cartItems.length === 0}
            onClick={handleConfirm}
          >
            Confirmar
          </ButtonConfirmar>
        </Footer>
      </Container>
    </Overlay>
  );
};

export default SummaryModal;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Container = styled.div`
  background: #2e2e2e;
  color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: 700;
`;

const Value = styled.span`
  margin-left: 8px;
  font-weight: 400;
`;

const ItemList = styled.ul`
  margin-top: 8px;
  padding-left: 20px;
`;

const Item = styled.li`
  font-size: 14px;
  margin-bottom: 4px;
`;

const ItemName = styled.span`
  font-weight: 600;
`;

const ItemQuantity = styled.span`
  opacity: 0.8;
`;

const Empty = styled.p`
  font-style: italic;
  opacity: 0.7;
`;

const Confirmation = styled.p`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const WarningText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #ff6b6b;
  font-weight: 500;
  ${(props) =>
    props.$type === "saida"
      ? `color: #ff6b6b;`
      : `color: #4caf50;`}
`;

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ButtonBase = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ButtonCancelar = styled(ButtonBase)`
  background-color: #5c5c5c;
  color: white;

  &:hover {
    background-color: #4b4b4b;
  }
`;

const ButtonConfirmar = styled(ButtonBase)`
  background-color: #7f56da;
  color: white;

  &:hover {
    background-color: #6a40c9;
  }

  &:disabled {
    background-color: #a69cb5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
