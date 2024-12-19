import ChampionRadar from "@/components/draft/DraftPage/_common/ChampionRadar";
import { useChampionRadarDialogStore } from "@/hooks/zustand-stores/dialogs/useChampionRadarDialogStore";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

export const ChampionRadarDialog = () => {
  const { isOpen, initialValue, closeDialog } = useChampionRadarDialogStore();

  return (
    <Dialog onClose={closeDialog} open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle id="champion-dialog-title">Champion Radar</DialogTitle>
      <DialogContent>
        {!!initialValue && <ChampionRadar showLabel values={initialValue} />}
      </DialogContent>
    </Dialog>
  );
};
