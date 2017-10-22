export default () =>
  <footer>
    {/*language=CSS*/}
    <style jsx>{`
        footer {
            margin-top: 4.5em;
            padding-bottom: 1.5em;
            text-align: center;
            font-size: .8rem;
            color: #aaa;
        }
    `}</style>

    <p>{new Date().getFullYear()}</p>
  </footer>
