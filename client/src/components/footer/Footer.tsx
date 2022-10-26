interface Props {
    message: string
}

const Footer = ({message}: Props) => <footer className={' left-1/2 -translate-x-1/2 fixed bottom-5 text-purple font-bold'}>{message}</footer>

export default Footer

