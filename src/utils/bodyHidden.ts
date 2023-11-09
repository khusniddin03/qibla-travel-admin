const bodyElement = document.body;

export const bodyHiddenHandler = (hidden: boolean = false) => {
    const aside = bodyElement?.querySelector('#aside > div') as HTMLDivElement;
    if (hidden) {
        bodyElement?.setAttribute('data-hidden', 'true');
        if (aside) {
            const bodyScrollWidth = window.innerWidth - bodyElement.offsetWidth;
            if (bodyScrollWidth) {
                aside.style.right = `${bodyScrollWidth}px`;
            }
        }
    } else {
        bodyElement?.removeAttribute('data-hidden');
        if (aside) {
            aside.style.right = '0';
        }
    }
}
