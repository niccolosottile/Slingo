import { useState } from "react";

export const useTranslatedSign = () => {
  const [translatedSign, setTranslatedSign] = useState("");

  return { translatedSign, setTranslatedSign };
};