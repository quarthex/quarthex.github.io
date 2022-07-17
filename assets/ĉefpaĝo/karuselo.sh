set -ex
for n in 1 2 3 4 5 6
do
    convert -resize  910X512 karuselo-$n.webp karuselo-$n-tablet.webp 
    convert -resize 1081X608 karuselo-$n.webp karuselo-$n-desktop.webp 
    convert -resize 1252X704 karuselo-$n.webp karuselo-$n-widescreen.webp 
done