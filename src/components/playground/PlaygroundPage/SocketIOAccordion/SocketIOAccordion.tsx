import Icons from "@/components/_common/Icons/Icons";
import MyTextField from "@/components/_common/inputs/MyTextField";
import Txt from "@/components/_common/text/Txt";
import useMeQuery from "@/hooks/react-query/domain/auth/useMeQuery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { io } from "socket.io-client";

const SocketIOAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);

  const { data: authUser } = useMeQuery();
  const socket = useMemo(() => io("http://localhost:3001"), []);

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: { text: string }) => {
    socket.emit("message", {
      username: authUser?.username,
      message: values.text,
    });

    reset({ text: "" });
  };

  useEffect(() => {
    socket.on("message", (data) => {
      // if (data.username === authUser?.username) return;

      console.log(data);
    });
  }, []);

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Socket.IO</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <MyTextField {...field} size="small" label="Message" />
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default SocketIOAccordion;
