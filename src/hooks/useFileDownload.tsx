import { useState } from "react";
import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from "@capacitor-community/file-opener"
import { base64FromPath, downloadFile } from "src/utilities/fileDownload";


export const useFileDownload = () => {
    const [loading, setLoading] = useState(false);

    const download = async (url: string, filename: string, onComplete?: () => void, onError?: () => void) => {
        if (Capacitor.isNativePlatform()) {
            try {
                setLoading(true);
                const base64 = await base64FromPath(url);
                const saveFile = await Filesystem.writeFile({
                    path: filename,
                    data: base64,
                    directory: Directory.Data
                })

                await FileOpener.open({
                    filePath: saveFile.uri
                })
                setLoading(false);
                onComplete?.();
            } catch (err) {
                setLoading(false);
                onError?.()
            }

        } else {
            downloadFile(url, filename);
        }
    }

    return {
        download,
        loading,
    }
}