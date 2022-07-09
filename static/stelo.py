import math
import subprocess
import xml.sax.saxutils
from typing import Iterator, Tuple


def krei_defs(gen: xml.sax.saxutils.XMLGenerator) -> None:
    gen.startElement("defs", {})
    gen.startElement("linearGradient", dict(id="a"))
    gen.startElement("stop", {"offset": "0", "stop-color": "#3cc600"})
    gen.endElement("stop")
    gen.startElement("stop", {"offset": "1", "stop-color": "#009bd3"})
    gen.endElement("stop")
    gen.endElement("linearGradient")
    gen.endElement("defs")


def polusa_al_kartezia(distanco: float, angulo: float) -> Tuple[float, float]:
    x = math.cos(angulo) * distanco
    y = math.sin(angulo) * distanco
    return (x, y)


def krei_oktogono(gen: xml.sax.saxutils.XMLGenerator, dimensio: int) -> None:
    def punktoj() -> Iterator[Tuple[int, int]]:
        for n in range(6):
            angulo = math.radians(60 * n)
            x, y = polusa_al_kartezia(dimensio / 2.0, angulo)
            x = x + dimensio / 2.0
            y = y + dimensio / 2.0
            yield int(x + 0.5), int(y + 0.5)

    d = "M" + " ".join("{} {}".format(x, y) for x, y in punktoj())
    attrs = dict(
        d=d,
        fill="url(#a)",
        transform="translate({0} {0}) rotate(-90) translate(-{0} -{0})".format(
            dimensio // 2
        ),
    )
    gen.startElement("path", attrs)
    gen.endElement("path")


def krei_stelo(gen: xml.sax.saxutils.XMLGenerator, dimensio: int) -> None:
    def punktoj() -> Iterator[Tuple[float, float]]:
        dim0 = dimensio * 0.295
        dim1 = dimensio * 0.147
        dim2 = dimensio * 0.05
        yield polusa_al_kartezia(dim0, math.radians(-90))
        for n in range(5):
            a0 = math.radians(72 * n - 90)
            a1 = math.radians(72 * n - 90 + 36)
            a2 = math.radians(72 * n - 90 + 72)
            x0, y0 = polusa_al_kartezia(dim0, a0)
            x1, y1 = polusa_al_kartezia(dim1, a1)
            x2, y2 = polusa_al_kartezia(dim0, a2)
            dx, dy = polusa_al_kartezia(dim2, a0 + math.pi / 2.0)
            yield x0 + dx, y0 + dy
            dx, dy = polusa_al_kartezia(dim2, a1 - math.pi / 2.0)
            yield x1 + dx, y1 + dy
            yield x1, y1
            dx, dy = polusa_al_kartezia(dim2, a1 + math.pi / 2.0)
            yield x1 + dx, y1 + dy
            dx, dy = polusa_al_kartezia(dim2, a2 - math.pi / 2.0)
            yield x2 + dx, y2 + dy
            yield x2, y2

    pp = punktoj()
    pp = ((x + dimensio / 2.0, y + dimensio / 2) for x, y in pp)
    pp = ((int(x + 0.5), int(y + 0.5)) for x, y in pp)
    x, y = next(pp)
    d = "M{} {}C{}".format(x, y, " ".join("{} {}".format(x, y) for x, y in pp))
    gen.startElement("path", dict(d=d, fill="#fff"))
    gen.endElement("path")


def krei_svg(gen: xml.sax.saxutils.XMLGenerator, dimensio: int) -> None:
    attrs = dict(
        viewBox="0 0 {0} {0}".format(dimensio), xmlns="http://www.w3.org/2000/svg"
    )
    gen.startElement("svg", attrs)
    krei_defs(gen)
    krei_oktogono(gen, dimensio)
    krei_stelo(gen, dimensio)
    gen.endElement("svg")


def main() -> None:
    gen = xml.sax.saxutils.XMLGenerator(encoding="utf-8", short_empty_elements=True)
    gen.startDocument()
    krei_svg(gen, 256)
    gen.endDocument()


if __name__ == "__main__":
    main()
