import FlexCol from "@/components/_common/flexboxes/FlexCol";
import MyTextField from "@/components/_common/inputs/MyTextField";
import { MalUserDto } from "@/hooks/react-query/domain/mal/types/MalUserDto";
import useMalUserQuery from "@/hooks/react-query/domain/mal/useMalUserQuery";
import useSaveMalUserMutation from "@/hooks/react-query/domain/mal/useSaveMalUserMutation";
import { Box, Button, Container } from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MalSimilarityVirtuoso from "./MalSimilarityVirtuoso/MalSimilarityVirtuoso";

export default function MalPage() {
  const { data: malUser } = useMalUserQuery({
    refetchOnWindowFocus: false,
  });

  const { reset, control, watch, handleSubmit } = useForm<MalUserDto>();

  useEffect(() => {
    if (malUser) {
      reset(malUser);
    }
  }, [malUser]);

  const { mutate } = useSaveMalUserMutation();

  const submit = (data: MalUserDto) => {
    mutate(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <FlexCol
          width="200px"
          style={{
            gap: 8,
          }}
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <MyTextField
                label="Username"
                {...field}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <MyTextField
                label="Password"
                {...field}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              width: 200,
            }}
          >
            Save
          </Button>
        </FlexCol>
      </form>

      <Box mt={4} />
      <MalSimilarityVirtuoso />
    </Container>
  );
}
