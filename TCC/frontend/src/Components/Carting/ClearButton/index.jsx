import styled from "styled-components";
import SaveCancelBTN from "../../Buttons/SaveCancelBTN";
import { useCart } from "../../../Context/Cart";

const ClearButton = () => {
  const { clearCart } = useCart();

  return (
    <ButtonWrapper>
      <SaveCancelBTN
        type="clear"
        onConfirm={clearCart}
      />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 30px;
  padding: 0px 20px;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
`;

export default ClearButton;
