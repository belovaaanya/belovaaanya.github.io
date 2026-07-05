# Asset Manifest

Page background: `#111`. Type: Intel One Mono. Case tags (all): `UI Concept`, `Retail`.
Case title (all, placeholder): `E-commerce Fast Checkout`. Panel square button is transparent in the
wireframe — rendered as a faint placeholder link.

Showcase render model: each showcase is drawn at its Figma design size (`dw × dh` px) and scaled to its
column with `transform: scale()`, so all coordinates below are raw Figma px. Layers are drawn in listed
order (first = back). `crop` = inner `<img>` position as `[left%, top%, width%, height%]`; `null` = `object-fit:cover`.

| Case | node | dw×dh | bg | showcase radius | layers (file · box[l,t,w,h] · radius · crop) |
|------|------|-------|----|-----------------|----------------------------------------------|
| fast-checkout | 164:573 | 832×620 | — | — | shot.png · [0,0,832,620] · r47 · [-19.54,-0.04,135.47,100.08] |
| health | 164:589 | 832×601 | — | — | shot.png · [-106,0,638,539] · r40 · [0,-0.04,154.56,100.07] ; shot.png · [545,0,254,539] · r20 · [-287.67,-5.52,428.08,110.72] |
| dashboard | 164:608 | 832×560 | #ff6b48 | 32 | shot.png · [0,55,823,450] · r0 · cover |
| streaming | 164:624 | 832×662 | — | 32 | base.png · [0,0,823,450] · r0 · cover ; mockups.png · [-179,0,1195,654] · r0 · cover |
| coffee | 164:653 | 832×545 | — | — | main.png · [-119,0,642,539] · r0 · [0,-5.31,125.7,110.61] ; side.png · [545,0,254,539] · r20 · [-287.67,-5.52,428.08,110.72] |
| portraits | 164:684 | 832×545 | — | — | p259 · [285.17,-27,262.9,361.07] ; p254 · [536.81,0.85,304.24,304.24] ; p255 · [556.41,294.77,284.64,271.23] crop[0,0,100,104.94] ; p256 · [287.23,305.08,269.17,260.92] crop[-4.98,-3.97,104.98,103.99] ; p257 · [0.53,305.08,286.7,260.92] crop[0,-2.37,100,109.88] ; p258 · [-17,0.85,304.24,304.24] |
| crypto | 164:669 | 830×598 | — | — | shot.png · [0,0,830,598] · r0 · [0,10.84,100,75.97] |

Bio (node 164:756): name "Anna Belova" + inline circular photo (110px, rotate -0.36deg) + role "Product Designer";
tags CV, TG (pill h24, text 12); bio paragraph (text 10). Photo: assets/bio/photo.png.
