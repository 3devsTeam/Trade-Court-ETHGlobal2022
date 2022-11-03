interface Props {
  message: string
}

const Footer = ({ message }: Props) => (
  <footer className={'text-center text-purple font-bold'}>{message}</footer>
)

export default Footer
