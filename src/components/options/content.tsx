import { BoltIcon, HouseIcon } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "../ui/motion-tabs";

const tabs = [
  { name: "General", icon: HouseIcon, content: () => <div>General</div> },
  {
    name: "Configuración",
    icon: BoltIcon,
    content: () => <div>Configuración</div>,
  },
];

export default function OptionsContent() {
  return (
    <Tabs className="flex-row">
      <TabsList className="h-fit flex-col">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name}>
            <tab.icon />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContents className="flex-1">
        {tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name}>
            <p className="text-xl font-semibold">{tab.name}</p>
            {tab.content()}
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  );
}
