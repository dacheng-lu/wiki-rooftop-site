# Source manifest — Wiki Rooftop dev pack

- Pack: `wiki-rooftop-dev-20` — 20 entries
- Corpus: `/home/dav/deck-rag/pilot3/index/dev.json`
- Corpus SHA-256: `74db5c6c721274c9b3634939307ead53667d1ad397e6504515a02d48d6a95299`
- Corpus size: 2,573,018 bytes — 896 chunks, 80 articles (dev split)
- Retrieval: BM25, k1=1.5, b=0.75, top-k=5, deterministic (`tools/bm25.py`)
- License/attribution: CC BY-SA 4.0 — Short excerpts for a local word game. Article titles and URLs are kept with each entry.

Every excerpt is a contiguous substring of its cited chunk. `source_hash` is the SHA-256 of the excerpt; `chunk_sha256` is the SHA-256 of the full source chunk. The game ships only the excerpts below, never a whole article.

| # | Answer | Article | Chunk | Domain | BM25 rank |
|---|--------|---------|-------|--------|-----------|
| 1 | `BEAVER` | [Ecosystem engineer](https://en.wikipedia.org/wiki/Ecosystem_engineer) | `wiki:Ecosystem_engineer:c000` | geography_environment | 1 |
| 2 | `FRET` | [Single-molecule FRET](https://en.wikipedia.org/wiki/Single-molecule_FRET) | `wiki:Single-molecule_FRET:c000` | chemistry_materials | 3 |
| 3 | `DECAPOD` | [Decapod anatomy](https://en.wikipedia.org/wiki/Decapod_anatomy) | `wiki:Decapod_anatomy:c000` | life_medicine | 1 |
| 4 | `TRANSCENDENTAL` | [Transcendental number theory](https://en.wikipedia.org/wiki/Transcendental_number_theory) | `wiki:Transcendental_number_theory:c001` | mathematics | 2 |
| 5 | `GANDHI` | [Nonviolent revolution](https://en.wikipedia.org/wiki/Nonviolent_revolution) | `wiki:Nonviolent_revolution:c001` | history | 2 |
| 6 | `CAPACITOR` | [Polymer capacitor](https://en.wikipedia.org/wiki/Polymer_capacitor) | `wiki:Polymer_capacitor:c000` | chemistry_materials | 2 |
| 7 | `LAMBDA` | [Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus) | `wiki:Lambda_calculus:c000` | mathematics | 3 |
| 8 | `CURVATURE` | [Differential geometry](https://en.wikipedia.org/wiki/Differential_geometry) | `wiki:Differential_geometry:c004` | mathematics | 1 |
| 9 | `TITANIC` | [Blue Star Line](https://en.wikipedia.org/wiki/Blue_Star_Line) | `wiki:Blue_Star_Line:c004` | physics_astronomy | 1 |
| 10 | `AVICENNA` | [Traditional medicine](https://en.wikipedia.org/wiki/Traditional_medicine) | `wiki:Traditional_medicine:c002` | life_medicine | 1 |
| 11 | `TAGORE` | [Indian literature](https://en.wikipedia.org/wiki/Indian_literature) | `wiki:Indian_literature:c001` | arts_humanities | 3 |
| 12 | `AFFIBODY` | [Affibody molecule](https://en.wikipedia.org/wiki/Affibody_molecule) | `wiki:Affibody_molecule:c000` | chemistry_materials | 1 |
| 13 | `OZONE` | [Homonuclear molecule](https://en.wikipedia.org/wiki/Homonuclear_molecule) | `wiki:Homonuclear_molecule:c000` | chemistry_materials | 1 |
| 14 | `PHARMACOLOGY` | [Pharmacology](https://en.wikipedia.org/wiki/Pharmacology) | `wiki:Pharmacology:c000` | life_medicine | 1 |
| 15 | `SLAM` | [National Poetry Slam](https://en.wikipedia.org/wiki/National_Poetry_Slam) | `wiki:National_Poetry_Slam:c000` | arts_humanities | 1 |
| 16 | `WILDERNESS` | [Wilderness medicine](https://en.wikipedia.org/wiki/Wilderness_medicine) | `wiki:Wilderness_medicine:c000` | life_medicine | 1 |
| 17 | `PHOTON` | [Photonic molecule](https://en.wikipedia.org/wiki/Photonic_molecule) | `wiki:Photonic_molecule:c000` | chemistry_materials | 1 |
| 18 | `PARADOX` | [Quantum mechanics of time travel](https://en.wikipedia.org/wiki/Quantum_mechanics_of_time_travel) | `wiki:Quantum_mechanics_of_time_travel:c000` | physics_astronomy | 3 |
| 19 | `KNOT` | [Arithmetic topology](https://en.wikipedia.org/wiki/Arithmetic_topology) | `wiki:Arithmetic_topology:c000` | mathematics | 1 |
| 20 | `CULTURE` | [Educational anthropology](https://en.wikipedia.org/wiki/Educational_anthropology) | `wiki:Educational_anthropology:c000` | social_science | 1 |

## 1. BEAVER

- **Clue:** Rodent that fells trees and builds dams, cited as the original model for species that reshape whole habitats.
- **Source:** [Ecosystem engineer](https://en.wikipedia.org/wiki/Ecosystem_engineer) (`wiki:Ecosystem_engineer`)
- **Chunk:** `wiki:Ecosystem_engineer:c000`
- **Retrieval:** `beaver clearcutting damming ecosystem engineers` — rank 1 of top 5
- **source_hash:** `cb462c63e99ab85afed8f2da38345a8a94219255473a323ba9e29bc2ed7afe6f`
- **chunk_sha256:** `9cfba4181af43c1e27f5261abd18c0919f9befa736a69466bfaa64660872b698`
- **Attribution:** Wikipedia, “Ecosystem engineer” — CC BY-SA 4.0 (local pilot corpus)

> Beavers are the original model for ecosystem engineers; in the process of clearcutting and damming, beavers alter their ecosystem extensively.

## 2. FRET

- **Clue:** Acronym for the non-radiative transfer of excited-state energy between two fluorophores, used as a nanoscale ruler.
- **Source:** [Single-molecule FRET](https://en.wikipedia.org/wiki/Single-molecule_FRET) (`wiki:Single-molecule_FRET`)
- **Chunk:** `wiki:Single-molecule_FRET:c000`
- **Retrieval:** `forster resonance energy transfer single molecule` — rank 3 of top 5
- **source_hash:** `f3123e70f3b1ad3c85ad9cd4e286d80f98b3214ab3c4f3d9be41a9e9fdc2f7e2`
- **chunk_sha256:** `36719580ea679bf7556b773f90c467b61d7900cbd660d237339b5c8f8aa9c1e3`
- **Attribution:** Wikipedia, “Single-molecule FRET” — CC BY-SA 4.0 (local pilot corpus)

> Single-molecule fluorescence (or Förster) resonance energy transfer (or smFRET) is a biophysical technique used to measure distances at the 1-10 nanometer scale in single molecules, typically biomolecules.

## 3. DECAPOD

- **Clue:** Ten-footed crustacean group whose name literally means “ten legs”.
- **Source:** [Decapod anatomy](https://en.wikipedia.org/wiki/Decapod_anatomy) (`wiki:Decapod_anatomy`)
- **Chunk:** `wiki:Decapod_anatomy:c000`
- **Retrieval:** `decapod ten legs crustacean anatomy` — rank 1 of top 5
- **source_hash:** `8ad926e3581c72f1239aa9788cd115d60a643ad40deb76fc9ed560d38fc39667`
- **chunk_sha256:** `58354156c6b7a00fe195daed87524692fb40b8f37ec43b2b15192a78856f2907`
- **Attribution:** Wikipedia, “Decapod anatomy” — CC BY-SA 4.0 (local pilot corpus)

> Pereiopods are primarily walking legs and are also used for gathering food. They are also the ten legs from which decapods take their name.

## 4. TRANSCENDENTAL

- **Clue:** Describes a number that is not the root of any nonzero polynomial with rational coefficients.
- **Source:** [Transcendental number theory](https://en.wikipedia.org/wiki/Transcendental_number_theory) (`wiki:Transcendental_number_theory`)
- **Chunk:** `wiki:Transcendental_number_theory:c001`
- **Retrieval:** `transcendental number polynomial rational coefficients` — rank 2 of top 5
- **source_hash:** `74d0fa03a243dfb4ab51fd0b9d88fbfd9807af09cec251bd242f13cef103f085`
- **chunk_sha256:** `b5c0cb92ffa3658a19e7952bb3877f9d7d86e61fa037dca3eed967c47c12b771`
- **Attribution:** Wikipedia, “Transcendental number theory” — CC BY-SA 4.0 (local pilot corpus)

> If no such polynomial exists then the number is called transcendental.

## 5. GANDHI

- **Clue:** Indian leader whose satyagraha philosophy made civil resistance a mass strategy.
- **Source:** [Nonviolent revolution](https://en.wikipedia.org/wiki/Nonviolent_revolution) (`wiki:Nonviolent_revolution`)
- **Chunk:** `wiki:Nonviolent_revolution:c001`
- **Retrieval:** `gandhi satyagraha nonviolent revolution india` — rank 2 of top 5
- **source_hash:** `164bb6833a046fa244687a17cf6505da08aef2a0836a2447c15f91eefd9243c7`
- **chunk_sha256:** `c4d6edcda73ee7ec9d96bf73b24f1a8f3b7f7afb4212f6c96c5115a924fca923`
- **Attribution:** Wikipedia, “Nonviolent revolution” — CC BY-SA 4.0 (local pilot corpus)

> Nonviolent revolution was popularized in the 20th century by the satyagraha philosophy of Mahatma Gandhi, who guided the people of India to independence from Britain.

## 6. CAPACITOR

- **Clue:** Two-terminal component that stores electrical charge; this article’s type replaces the liquid electrolyte with a conductive polymer.
- **Source:** [Polymer capacitor](https://en.wikipedia.org/wiki/Polymer_capacitor) (`wiki:Polymer_capacitor`)
- **Chunk:** `wiki:Polymer_capacitor:c000`
- **Retrieval:** `polymer electrolytic capacitor conductive electrolyte` — rank 2 of top 5
- **source_hash:** `746331ef0d27ea8451539a8140c0c2a7c31207ab06202996c1a53ca76b1e46fa`
- **chunk_sha256:** `19166f1bb0d27a1ef342d4c39015ad034f361bdf637e01e617ec3eec28dcf17a`
- **Attribution:** Wikipedia, “Polymer capacitor” — CC BY-SA 4.0 (local pilot corpus)

> A polymer capacitor, or more accurately a polymer electrolytic capacitor, is an electrolytic capacitor (e-cap) with a solid conductive polymer electrolyte.

## 7. LAMBDA

- **Clue:** Greek letter that names Church’s formal system for function abstraction and application.
- **Source:** [Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus) (`wiki:Lambda_calculus`)
- **Chunk:** `wiki:Lambda_calculus:c000`
- **Retrieval:** `lambda calculus church function abstraction` — rank 3 of top 5
- **source_hash:** `e91c34a349acd1598bd0f2d209307f99b6805083160d7f0628687b7a9a1b3ad7`
- **chunk_sha256:** `61475d9f9f4c9487e6d3efcd11dedc5d9a534b685232100bead0d3681e2f2328`
- **Attribution:** Wikipedia, “Lambda calculus” — CC BY-SA 4.0 (local pilot corpus)

> In mathematical logic, the lambda calculus (also written as λ-calculus) is a formal system for expressing computation based on function abstraction and application using variable binding and substitution.

## 8. CURVATURE

- **Clue:** Measure of how a curve or surface bends, studied through osculating circles and principal directions.
- **Source:** [Differential geometry](https://en.wikipedia.org/wiki/Differential_geometry) (`wiki:Differential_geometry`)
- **Chunk:** `wiki:Differential_geometry:c004`
- **Retrieval:** `curvature osculating circle differential geometry` — rank 1 of top 5
- **source_hash:** `2a3e1640d94ab6b745827bcb224aa288c7102e0b46079901b574050d81b0a109`
- **chunk_sha256:** `fc276bc5970006dc5a86f394daf97612367ea6616eea81930c8b62d8afe4a1c0`
- **Attribution:** Wikipedia, “Differential geometry” — CC BY-SA 4.0 (local pilot corpus)

> Importantly Clairaut introduced the terminology of curvature and double curvature, essentially the notion of principal curvatures later studied by Gauss and others.

## 9. TITANIC

- **Clue:** Ocean liner that sank in 1912; a modern replica proposal borrows its name.
- **Source:** [Blue Star Line](https://en.wikipedia.org/wiki/Blue_Star_Line) (`wiki:Blue_Star_Line`)
- **Chunk:** `wiki:Blue_Star_Line:c004`
- **Retrieval:** `titanic replica blue star line 1912` — rank 1 of top 5
- **source_hash:** `b9fcfc90a77cba145518507d1a0a32d742879c77a0067a53a93057cf64579a28`
- **chunk_sha256:** `6838cdf83acf118179607ee70a6c18ad449e3852180476de291a08915e1d9469`
- **Attribution:** Wikipedia, “Blue Star Line” — CC BY-SA 4.0 (local pilot corpus)

> The Titanic II, a replica ship proposal of the original Titanic that sank in 1912, is a Blue Star Line Cruises ship owned by Australian billionaire/businessman Clive Palmer who started the plan on April 14, 2012.

## 10. AVICENNA

- **Clue:** Persian polymath whose medical compilations were translated into Latin Europe.
- **Source:** [Traditional medicine](https://en.wikipedia.org/wiki/Traditional_medicine) (`wiki:Traditional_medicine`)
- **Chunk:** `wiki:Traditional_medicine:c002`
- **Retrieval:** `avicenna persian medical compilations` — rank 1 of top 5
- **source_hash:** `8955adccb4dc3fa9211a734ba51dbbc0b849553647fb0960fafeafe59234158c`
- **chunk_sha256:** `b55d3d69fc593624f7137a4e09cc7193cdf914dbedfb71861b4e094fe4a4d70a`
- **Attribution:** Wikipedia, “Traditional medicine” — CC BY-SA 4.0 (local pilot corpus)

> These early Greek and Roman compilations became the backbone of European medical theory and were translated by the Persian Avicenna (Ibn Sīnā, 980–1037), the Persian Rhazes (Rāzi, 865–925) and the Jewish Maimonides.

## 11. TAGORE

- **Clue:** Bengali poet who became India’s first Nobel laureate in literature in 1913.
- **Source:** [Indian literature](https://en.wikipedia.org/wiki/Indian_literature) (`wiki:Indian_literature`)
- **Chunk:** `wiki:Indian_literature:c001`
- **Retrieval:** `tagore bengali nobel literature 1913` — rank 3 of top 5
- **source_hash:** `d56950e22452ad8fd565163d2042c8b4120299b6cc0db643853090e96a7fbd35`
- **chunk_sha256:** `a5f2570ceee5fdcba35a00fd539e44abeca9435d4bda18b44c8149f85c071a61`
- **Attribution:** Wikipedia, “Indian literature” — CC BY-SA 4.0 (local pilot corpus)

> In 1913, Bengali poet Rabindranath Tagore became India's first Nobel laureate in literature.

## 12. AFFIBODY

- **Clue:** Small engineered protein scaffold that imitates antibodies as a binding reagent.
- **Source:** [Affibody molecule](https://en.wikipedia.org/wiki/Affibody_molecule) (`wiki:Affibody_molecule`)
- **Chunk:** `wiki:Affibody_molecule:c000`
- **Retrieval:** `affibody engineered protein antibody mimetic` — rank 1 of top 5
- **source_hash:** `b2b0a70679e4206d2d4033693080dd410647cfdb074396872bec2685598871a1`
- **chunk_sha256:** `78ceecd7199a7bd191fd3abf0c3bf1017d29829a8440530c63e964c14edeafcf`
- **Attribution:** Wikipedia, “Affibody molecule” — CC BY-SA 4.0 (local pilot corpus)

> Affibody molecules are small, robust proteins engineered to bind to a large number of target proteins or peptides with high affinity, imitating monoclonal antibodies, and are therefore a member of the family of antibody mimetics.

## 13. OZONE

- **Clue:** Triatomic allotrope of oxygen, written O3.
- **Source:** [Homonuclear molecule](https://en.wikipedia.org/wiki/Homonuclear_molecule) (`wiki:Homonuclear_molecule`)
- **Chunk:** `wiki:Homonuclear_molecule:c000`
- **Retrieval:** `ozone triatomic homonuclear molecule` — rank 1 of top 5
- **source_hash:** `93cb5fe59555ca5754b764e42157bc331a64c738cc9c17c1e64c90f19d5fbc17`
- **chunk_sha256:** `94037d2b77ecafbdcb80aa63300bcb225a60b5e48bc9c1afaea386565900d8c1`
- **Attribution:** Wikipedia, “Homonuclear molecule” — CC BY-SA 4.0 (local pilot corpus)

> Ozone (O3) is a common triatomic homonuclear molecule.

## 14. PHARMACOLOGY

- **Clue:** Discipline studying the origin, composition and biological action of drugs.
- **Source:** [Pharmacology](https://en.wikipedia.org/wiki/Pharmacology) (`wiki:Pharmacology`)
- **Chunk:** `wiki:Pharmacology:c000`
- **Retrieval:** `pharmacology science of drugs medications` — rank 1 of top 5
- **source_hash:** `53ec7c1e6a50cda7db6623d71dcc8cc5a198f972c0288abe2d14f662e80ae82a`
- **chunk_sha256:** `d2078abc3cb05f0e8fd531b0b90643619a683a0bffae65133158bfb94f2643ec`
- **Attribution:** Wikipedia, “Pharmacology” — CC BY-SA 4.0 (local pilot corpus)

> Pharmacology is the science of drugs and medications, including a substance's origin, composition and interaction with biological systems; specifically through pharmacokinetics, pharmacodynamics, therapeutic use, and toxicology.

## 15. SLAM

- **Clue:** Competitive poetry event where teams perform and are judged; the US national version ran until 2018.
- **Source:** [National Poetry Slam](https://en.wikipedia.org/wiki/National_Poetry_Slam) (`wiki:National_Poetry_Slam`)
- **Chunk:** `wiki:National_Poetry_Slam:c000`
- **Retrieval:** `poetry slam competition performance` — rank 1 of top 5
- **source_hash:** `15ff5fd3581f0487e10f6284b8914133f20b1e90ecc97388440c323759036f76`
- **chunk_sha256:** `2d0f85f4422f326c7bec5233744b53aca46bbf72ca8b578cb8ee2c27aa67a041`
- **Attribution:** Wikipedia, “National Poetry Slam” — CC BY-SA 4.0 (local pilot corpus)

> The National Poetry Slam (NPS) was a performance poetry competition where teams from across the United States, Canada, and, occasionally, Europe and Australia, participate in a large-scale poetry slam.

## 16. WILDERNESS

- **Clue:** Medical specialty concerned with care in remote, austere and expedition environments.
- **Source:** [Wilderness medicine](https://en.wikipedia.org/wiki/Wilderness_medicine) (`wiki:Wilderness_medicine`)
- **Chunk:** `wiki:Wilderness_medicine:c000`
- **Retrieval:** `wilderness medicine remote austere expedition` — rank 1 of top 5
- **source_hash:** `ff6654ef9e84777ad4e9e1e04b575277b25be204f525b3e46859097acff56ea3`
- **chunk_sha256:** `4cfd4077345251cdce1fa26502a957445a3e0175c0c88d06c7ade137269b2348`
- **Attribution:** Wikipedia, “Wilderness medicine” — CC BY-SA 4.0 (local pilot corpus)

> Wilderness medicine is a medical specialty concerned with medical care in remote, wilderness and expedition environments.

## 17. PHOTON

- **Clue:** Massless quantum of light that can bind with others to form a “molecule”.
- **Source:** [Photonic molecule](https://en.wikipedia.org/wiki/Photonic_molecule) (`wiki:Photonic_molecule`)
- **Chunk:** `wiki:Photonic_molecule:c000`
- **Retrieval:** `photonic molecule photons bind matter` — rank 1 of top 5
- **source_hash:** `961f81de488601f0c13aa1e1b1b459da73b894d1f1874ed50add5a5bfdcd891f`
- **chunk_sha256:** `19bafd7da3795bdc538feb58e545ca94c9ea3f2c1cffea0ee4b1a40dc815be61`
- **Attribution:** Wikipedia, “Photonic molecule” — CC BY-SA 4.0 (local pilot corpus)

> Photonic molecules are a form of matter in which photons bind together to form "molecules".

## 18. PARADOX

- **Clue:** A historical contradiction that time travellers must avoid, according to the self-consistency principle.
- **Source:** [Quantum mechanics of time travel](https://en.wikipedia.org/wiki/Quantum_mechanics_of_time_travel) (`wiki:Quantum_mechanics_of_time_travel`)
- **Chunk:** `wiki:Quantum_mechanics_of_time_travel:c000`
- **Retrieval:** `time travel paradox self consistency` — rank 3 of top 5
- **source_hash:** `d45bf3310df5d1db6d087df6014259b6078c8cde7858f578df712acfae99fd66`
- **chunk_sha256:** `85100a5075f36fba9c5d0301257e4fcb9a88e4a67fe8ef0f0917812dc0235e63`
- **Attribution:** Wikipedia, “Quantum mechanics of time travel” — CC BY-SA 4.0 (local pilot corpus)

> According to this principle, any changes made by a time traveler in the past must not create historical paradoxes.

## 19. KNOT

- **Clue:** Closed curve in a 3-manifold; arithmetic topology pairs prime ideals with these.
- **Source:** [Arithmetic topology](https://en.wikipedia.org/wiki/Arithmetic_topology) (`wiki:Arithmetic_topology`)
- **Chunk:** `wiki:Arithmetic_topology:c000`
- **Retrieval:** `arithmetic topology prime ideals knots` — rank 1 of top 5
- **source_hash:** `879f24642529911fb3e8010f225fcddd010b5d5a7b38c74d5f2cfaa519e5dd30`
- **chunk_sha256:** `82a0d0cca7ce1e1eeb05d5a5478e53f796b7f3fc3bd7f579287c06c9e0874bbf`
- **Attribution:** Wikipedia, “Arithmetic topology” — CC BY-SA 4.0 (local pilot corpus)

> Ideals in the ring of integers correspond to links, and prime ideals correspond to knots.

## 20. CULTURE

- **Clue:** Shared beliefs and practices whose role in education is studied by educational anthropologists.
- **Source:** [Educational anthropology](https://en.wikipedia.org/wiki/Educational_anthropology) (`wiki:Educational_anthropology`)
- **Chunk:** `wiki:Educational_anthropology:c000`
- **Retrieval:** `culture educational anthropology classrooms` — rank 1 of top 5
- **source_hash:** `928a1075f435df4a60bd917b323d2d7a8a9ab73b3d3a24df24e005da47ae8c4a`
- **chunk_sha256:** `1d189c00e055f1e9d861d877b2e927eaa65b3b93f5e35094a60ff0fe9a440c80`
- **Attribution:** Wikipedia, “Educational anthropology” — CC BY-SA 4.0 (local pilot corpus)

> Educational anthropology, or the anthropology of education, is a subfield of sociocultural anthropology that focuses on the role of culture in education and how educational settings shape social processes and cultural relations.
