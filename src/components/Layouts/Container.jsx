import styles from '../css/Container.module.css'
const Container = ({children}) => {
return(
    <main className={styles.container}>
      {children}
    </main>
)
}

export default Container