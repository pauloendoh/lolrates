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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSocket, useSocketEvent } from "socket.io-react-hook";

interface IMessage {
  username: string;
  message: string;
}

const SocketIOHookAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: authUser } = useMeQuery();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const { socket, error } = useSocket("http://localhost:3001");
  const { lastMessage, sendMessage } = useSocketEvent<IMessage>(
    socket,
    "message"
  );

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: { text: string }) => {
    sendMessage({
      message: values.text,
      username: authUser?.username,
    } as IMessage);
    reset({ text: "" });
  };

  useEffect(() => {
    console.log({ lastMessage });
    if (lastMessage) setMessages((prev) => [...prev, lastMessage]);
  }, [lastMessage]);

  return (
    <Accordion expanded={isOpen}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpen(!isOpen)}
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
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {message.username}: {message.message}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SocketIOHookAccordion;
