import React, { useEffect, useState, useRef } from 'react';

declare const Html5Qrcode: any;

const QRScanner: React.FC = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<any>(null);
    const readerId = "qr-reader";

    const startScan = () => {
        if (!scannerRef.current) return;

        setError(null);
        scannerRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText: string) => {
                if (scannerRef.current?.isScanning) {
                    scannerRef.current.stop();
                }
                setScanResult(decodedText);
            },
            () => { /* Ignore non-critical messages */ }
        ).catch((err: any) => {
            setError(`Camera error: ${err.message}`);
        });
    };

    useEffect(() => {
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode(readerId);
        }
        
        startScan();

        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch((err: any) => console.error("QR Scanner stop failed", err));
            }
        };
    }, []);

    const handleReset = () => {
        setScanResult(null);
        startScan();
    };

    return (
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold">QR Code Scanner</h2>
            <div id={readerId} className={`w-full max-w-sm aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner ${scanResult ? 'hidden' : ''}`}></div>

            {error && !scanResult && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md text-center">{error}</p>}

            {scanResult && (
                <div className="w-full max-w-sm bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-lg mb-2">Scan Result:</h3>
                    <textarea
                        readOnly
                        value={scanResult}
                        className="w-full h-32 p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-sm"
                    />
                    <div className="mt-4 flex space-x-2">
                        <a 
                            href={scanResult} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Open Link
                        </a>
                        <button 
                            onClick={() => navigator.clipboard.writeText(scanResult)}
                            className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                        >
                            Copy Text
                        </button>
                    </div>
                    <button onClick={handleReset} className="mt-4 w-full text-center text-sm text-slate-500 hover:underline">
                        Scan Another Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;