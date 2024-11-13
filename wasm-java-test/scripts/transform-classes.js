const fs = require('fs');
const path = require('path');

function transformClassesJS() {
    const classesPath = path.join(__dirname, '..', 'public', 'classes.js');

    try {
        if (!fs.existsSync(classesPath)) {
            console.error(`File not found: ${classesPath}`);
            return;
        }

        // 파일 읽기
        let content = fs.readFileSync(classesPath, 'utf8');
        console.log('Successfully read classes.js');

        // 주요 변경: IIFE의 끝부분을 찾아서 코드 삽입
        const insertPosition = content.lastIndexOf('B.main=C;');
        if (insertPosition === -1) {
            console.error('Could not find insertion point (B.main=C)');
            return;
        }

        // 코드 삽입
        const newContent =
            content.slice(0, insertPosition) +
            'B.main=C;\nwindow.B=B;' +
            content.slice(insertPosition + 'B.main=C;'.length);

        // 파일에 쓰기
        fs.writeFileSync(classesPath, newContent, 'utf8');
        console.log('Successfully added window.B = B to classes.js');

        // 확인
        const verifyContent = fs.readFileSync(classesPath, 'utf8');
        if (verifyContent.includes('window.B=B;')) {
            console.log('Verified: window.B = B was successfully added');
            // 파일 내용 출력
            console.log('Relevant section of the file:');
            const lines = verifyContent.split('\n');
            const index = lines.findIndex(line => line.includes('window.B=B'));
            if (index !== -1) {
                console.log(lines.slice(Math.max(0, index - 2), index + 3).join('\n'));
            }
        } else {
            console.error('Verification failed: window.B = B was not added correctly');
        }

    } catch (error) {
        console.error('Error transforming classes.js:', error);
        console.error('Error details:', error.stack);
        process.exit(1);
    }
}

// 스크립트가 직접 실행될 때만 실행
if (require.main === module) {
    transformClassesJS();
}

module.exports = transformClassesJS;