import "../../Style/Public/News/LastChapterLink.css"

const LastChapterLink = () => {
    return (
        <div className="last-chapter">
            <h3 className="last-chapter-title">Retrouvez ici le dernier chapitre disponible</h3>
            <p className="mangaplus-link">Le dernier chapitre est disponible sur le site <a className="last-chapter-link" href="https://mangaplus.shueisha.co.jp/updates" target="_blank">MangaPlus</a> chaque dimanche à 17h !</p>
            <a className="last-chapter-link" href="https://mangaplus.shueisha.co.jp/titles/700005" target="_blank">Cliquez ici pour le découvrire</a>
        </div>
    )
}

export default LastChapterLink;