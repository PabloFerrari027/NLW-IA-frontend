import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect(props: PromptSelectProps) {
  const [promps, setPromps] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPromps(response.data);
    });
  }, []);

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = promps?.find((prompt) => promptId === prompt.id);

    if (!selectedPrompt) {
      return;
    }

    props.onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {promps?.map((prompt) => {
          return (
            <SelectItem value={prompt.id} key={prompt.id}>
              {prompt.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
