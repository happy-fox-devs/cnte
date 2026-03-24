import BasicField from "../ui/basic-field";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ShortcutDialogContent({
  type,
  title,
  description,
  name,
  url,
  setName,
  setUrl,
  handleSubmit,
}: {
  type: "add" | "edit";
  title: string;
  description: string;
  name: string;
  url: string;
  setName: SetState<string>;
  setUrl: SetState<string>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="capitalize">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <BasicField name="Name" value={name} onChange={setName} />
          <BasicField name="URL" value={url} onChange={setUrl} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="capitalize">
              {type}
            </Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
