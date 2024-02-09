export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("method did not return a string"));
      }
    };
    reader.readAsDataURL(blob);
  });
}

export function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.target = "__blank";
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link?.parentNode?.removeChild(link);
  }, 0);
}
