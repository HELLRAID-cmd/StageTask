import { useUrl } from "../Context/useUrl";

const useCopyToClipboard = () => {
  const { setCopy } = useUrl();

  const copy = async (text: string) => {
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 1000);

    return await navigator.clipboard.writeText(text);
  };

  return copy;
};

export default useCopyToClipboard;
