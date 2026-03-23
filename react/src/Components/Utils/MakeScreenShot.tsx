import html2canvas from "html2canvas";

const makeScreenShot = async (
  element: HTMLElement | null,
): Promise<string | null> => {
  if (!element) return null;

  const canvas = await html2canvas(element, {
    useCORS: true,
  });

  return canvas.toDataURL("image/jpeg", 0.5);
};

export default makeScreenShot;
