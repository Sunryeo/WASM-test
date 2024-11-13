"use client";

import Image from "next/image";
import {useEffect, useState, useRef} from "react";
import styles from "./page.module.css";

export default function Home() {
    const [output, setOutput] = useState("Waiting for execution...");

    useEffect(() => {
        // TeaVM의 원래 출력 함수 저장
        const originalC_ = window.$rt_putStdoutCustom;

        // 출력을 가로채는 함수
        window.$rt_putStdoutCustom = (message) => {
            // 원본 출력 함수 호출 (필요한 경우)
            if (originalC_) {
                originalC_(message);
            }

            // 상태 업데이트
            setOutput((prev) =>
                prev === "Waiting for execution..." ? message : `${prev}${message}`
            );
        };

        const loadScript = () => {
            return new Promise((resolve, reject) => {
                // B 객체를 전역으로 먼저 정의
                window.B = {};

                const script = document.createElement("script");
                script.src = "/classes.js";

                script.onload = () => {
                    if (window.B?.main) {
                        try {
                            window.B.main();
                            resolve();
                        } catch (error) {
                            reject(new Error(`Error executing B.main: ${error.message}`));
                        }
                    } else {
                        reject(new Error("B.main not found after script load"));
                    }
                };

                script.onerror = () => reject(new Error("Failed to load script"));
                document.body.appendChild(script);
            });
        };

        loadScript().catch((error) => {
            setOutput(`Error: ${error.message}`);
        });

        // Cleanup
        return () => {
            window.$rt_putStdoutCustom = originalC_;
            const script = document.querySelector('script[src="/classes.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.output}>
                <h2>Execution Output:</h2>
                <pre
                    style={{
                        backgroundColor: "#f5f5f5",
                        color: "black",
                        padding: "1rem",
                        borderRadius: "4px",
                        minHeight: "100px",
                        maxHeight: "300px",
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        border: "1px solid #ddd",
                    }}
                >
          {output}
        </pre>
            </div>

            <main className={styles.main}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        Get started by editing <code>src/app/page.js</code>.
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className={styles.ctas}>
                    <a
                        className={styles.primary}
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={styles.logo}
                            src="/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Deploy now
                    </a>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondary}
                    >
                        Read our docs
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
