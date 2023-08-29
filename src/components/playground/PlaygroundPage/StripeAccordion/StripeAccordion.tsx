import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import myClientAxios from "@/utils/axios/myClientAxios";
import { urls } from "@/utils/urls/urls";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@material-ui/core";
import { useState } from "react";

const StripeAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleCheckout = () => {
    myClientAxios
      .post(urls.api.playground.stripeCheckout, {
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      })
      .then((res) => {
        console.log(res.data);

        window.location = res.data.url;
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Stripe</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <Flex>
          <Box>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Box>
        </Flex>
      </AccordionDetails>
    </Accordion>
  );
};

export default StripeAccordion;
