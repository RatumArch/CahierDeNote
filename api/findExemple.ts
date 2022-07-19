import { VercelResponse } from "@vercel/node"

export default function verles(req: any, res: VercelResponse) {
    const lang = req.query?.lang
    let textHomePage = 
        "<h2>Exemples</h2><p>La police par défaut est <strong>Fira Code</strong>, ce qui signifie que vous pouvez écrire des symboles grâce à de belles ligatures :</p><ul><li><p><em>a &gt;= b &amp;&amp; b&gt;=c =&gt; a&gt;=c</em></p></li></ul><p>Si les ligatures ne vous suffisent pas, ce n'est pas grave, car vous pouvez aussi écrire des équation en <strong>LaTex</strong>.</p><h2><latex-block rawtext='\\cos_\\theta = \\frac{e^{i\\theta}+e^{-i\\theta}}{2}' latexnodeid='1658160909015'></latex-block></h2><p></p><h2>Images</h2><p>Bien entendu, il est aussi possible d'insérer des images.</p><p>Voici une photo de mangrove.</p><image-input src='https://res.cloudinary.com/dzggewhvt/image/upload/v1658162084/mangrove.png' width='84px'></image-input>"
    
    res.status(200).setHeader('Content-Type', 'text/plain').send(textHomePage)
}