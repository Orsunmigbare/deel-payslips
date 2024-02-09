import styles from "./styles.module.css"



export const Loader = () => {
    return (
        <div className={`${styles.loader}`}>
            <img className={styles.image} src="/deel.png" alt="loader" />
        </div>
    )
}