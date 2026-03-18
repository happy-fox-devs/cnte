import { Fragment } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import OptionsContent from "./content";
import FloatingTriggerButton from "./floating-trigger-button";

export default function Options() {
  return (
    <Fragment>
      <Dialog>
        <div className="fixed right-0 bottom-0 mr-4 mb-4">
          <DialogTrigger>
            <FloatingTriggerButton />
          </DialogTrigger>
        </div>
        <DialogContent className="h-[calc(100%-2rem)] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <OptionsContent />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
