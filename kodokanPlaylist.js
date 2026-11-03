/**
 * Catálogo completo dos 119 vídeos da Playlist Oficial:
 * "KODOKAN JUDO 100 Techniques" (PLtz539PTepc16H2iu5F3Q3D7_He1EYlIQ)
 * Organizados pedagogicamente por Grau de Kyu (Gokyo no Waza & Katame-waza).
 */

export const KYU_LEVELS = [
  {
    id: '5kyu',
    label: '5º Kyu',
    shortLabel: '5º Kyu',
    subtitle: 'Dai-Ikkyo (1º Gokyo) & Imobilizações Base',
    beltHint: 'Iniciante • Base Fundamental',
    order: 1,
    badgeColor: '#111111'
  },
  {
    id: '4kyu',
    label: '4º Kyu',
    shortLabel: '4º Kyu',
    subtitle: 'Dai-Nikyo (2º Gokyo) & Osaekomi Intermediário',
    beltHint: 'Intermediário I',
    order: 2,
    badgeColor: '#111111'
  },
  {
    id: '3kyu',
    label: '3º Kyu',
    shortLabel: '3º Kyu',
    subtitle: 'Dai-Sankyo (3º Gokyo) & Início Shime-waza',
    beltHint: 'Intermediário II',
    order: 3,
    badgeColor: '#111111'
  },
  {
    id: '2kyu',
    label: '2º Kyu',
    shortLabel: '2º Kyu',
    subtitle: 'Dai-Yonkyo (4º Gokyo), Shime & Kansetsu Base',
    beltHint: 'Avançado I',
    order: 4,
    badgeColor: '#111111'
  },
  {
    id: '1kyu',
    label: '1º Kyu',
    shortLabel: '1º Kyu',
    subtitle: 'Dai-Gokyo (5º Gokyo) & Kansetsu Avançado',
    beltHint: 'Avançado II • Pré-Faixa Preta',
    order: 5,
    badgeColor: '#D90429'
  },
  {
    id: 'extra',
    label: 'Extra / Dan',
    shortLabel: 'Extra / Dan',
    subtitle: 'Habukareta-waza, Shinmeisho-no-waza & Compilações',
    beltHint: 'Técnicas Complementares & Contragolpes',
    order: 6,
    badgeColor: '#D90429'
  }
];

export const WAZA_CATEGORIES = [
  { id: 'all', label: 'Todas Divisões' },
  { id: 'Te-waza', label: 'Te-waza (Mão/Braço)' },
  { id: 'Koshi-waza', label: 'Koshi-waza (Quadril)' },
  { id: 'Ashi-waza', label: 'Ashi-waza (Perna/Pé)' },
  { id: 'Ma-sutemi-waza', label: 'Ma-sutemi (Sacrifício Frontal)' },
  { id: 'Yoko-sutemi-waza', label: 'Yoko-sutemi (Sacrifício Lateral)' },
  { id: 'Osaekomi-waza', label: 'Osaekomi (Imobilizações)' },
  { id: 'Shime-waza', label: 'Shime-waza (Estrangulamentos)' },
  { id: 'Kansetsu-waza', label: 'Kansetsu-waza (Chaves)' }
];

const KYU_MAP = {
  // 5º KYU - Dai-Ikkyo (1º Grupo Gokyo) + Base Osaekomi
  'De-ashi-harai': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Varrida de pé avançado' },
  'Hiza-guruma': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Giro sobre o joelho' },
  'Sasae-tsurikomi-ashi': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Bloqueio do pé com puxada e suspensão' },
  'Uki-goshi': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Quadril flutuante' },
  'O-soto-gari': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Grande ceifada externa' },
  'O-goshi': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Grande projeção de quadril' },
  'O-uchi-gari': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Grande ceifada interna' },
  'Seoi-nage': { kyu: '5kyu', gokyo: '1º Gokyo (Dai-Ikkyo)', ptDesc: 'Projeção sobre o ombro (Morote)' },
  'Ippon-seoi-nage': { kyu: '5kyu', gokyo: 'Base Fundamental (Shinmeisho)', ptDesc: 'Projeção sobre o ombro por um braço' },
  'Kesa-gatame': { kyu: '5kyu', gokyo: 'Osaekomi Base', ptDesc: 'Imobilização lateral em diagonal (lenço)' },
  'Kesa-gatame Escapes': { kyu: '5kyu', gokyo: 'Defesa Osaekomi Base', ptDesc: 'Saídas da imobilização Kesa-gatame' },
  'Kuzure-kesa-gatame': { kyu: '5kyu', gokyo: 'Osaekomi Base', ptDesc: 'Variação da imobilização Kesa-gatame' },
  'Kuzure-kesa-gatame Escapes': { kyu: '5kyu', gokyo: 'Defesa Osaekomi Base', ptDesc: 'Saídas de Kuzure-kesa-gatame' },
  'Kami-shiho-gatame': { kyu: '5kyu', gokyo: 'Osaekomi Base', ptDesc: 'Imobilização pelos quatro cantos por cima' },
  'Kami-siho-gatame Escapes': { kyu: '5kyu', gokyo: 'Defesa Osaekomi Base', ptDesc: 'Saídas de Kami-shiho-gatame' },
  'Yoko-shiho-gatame': { kyu: '5kyu', gokyo: 'Osaekomi Base', ptDesc: 'Imobilização lateral pelos quatro cantos' },
  'Yoko-shiho-gatame Escapes': { kyu: '5kyu', gokyo: 'Defesa Osaekomi Base', ptDesc: 'Saídas de Yoko-shiho-gatame' },
  'Tate-shiho-gatame': { kyu: '5kyu', gokyo: 'Osaekomi Base', ptDesc: 'Imobilização montada longitudinal' },
  'Tate-shiho-gatame Escapes': { kyu: '5kyu', gokyo: 'Defesa Osaekomi Base', ptDesc: 'Saídas de Tate-shiho-gatame' },

  // 4º KYU - Dai-Nikyo (2º Grupo Gokyo) + Osaekomi Intermediário
  'Ko-soto-gari': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Pequena ceifada externa' },
  'Ko-uchi-gari': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Pequena ceifada interna' },
  'Koshi-guruma': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Giro de quadril envolvendo o pescoço' },
  'Tsurikomi-goshi': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Projeção de quadril suspendendo e puxando' },
  'Okuri-ashi-harai': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Varrida dupla dos pés deslizando' },
  'Tai-otoshi': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Queda do corpo com bloqueio na perna' },
  'Harai-goshi': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Varrida de quadril' },
  'Uchi-mata': { kyu: '4kyu', gokyo: '2º Gokyo (Dai-Nikyo)', ptDesc: 'Projeção pela parte interna da coxa' },
  'Kata-gatame': { kyu: '4kyu', gokyo: 'Osaekomi Intermediário', ptDesc: 'Imobilização do ombro e pescoço' },
  'Kata-gatame Escapes': { kyu: '4kyu', gokyo: 'Defesa Osaekomi', ptDesc: 'Saídas da imobilização Kata-gatame' },
  'Kuzure-kami-shiho-gatame': { kyu: '4kyu', gokyo: 'Osaekomi Intermediário', ptDesc: 'Variação superior dos quatro cantos' },
  'Kuzure-kami-siho-gatame Escapes': { kyu: '4kyu', gokyo: 'Defesa Osaekomi', ptDesc: 'Saídas de Kuzure-kami-shiho-gatame' },
  'Ushiro-kesa-gatame': { kyu: '4kyu', gokyo: 'Osaekomi Intermediário', ptDesc: 'Imobilização Kesa invertida (voltado para os pés)' },
  'Ushiro-kesa-gatame Escapes': { kyu: '4kyu', gokyo: 'Defesa Osaekomi', ptDesc: 'Saídas de Ushiro-kesa-gatame' },

  // 3º KYU - Dai-Sankyo (3º Grupo Gokyo) + Início Shime-waza
  'Ko-soto-gake': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Pequeno enganchamento externo' },
  'Tsuri-goshi': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Quadril suspenso pela faixa' },
  'Yoko-otoshi': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Queda lateral de sacrifício' },
  'Ashi-guruma': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Giro sobre a perna estendida' },
  'Hane-goshi': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Quadril saltitante / mola' },
  'Harai-tsurikomi-ashi': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Varrida do pé recuado com suspensão' },
  'Tomoe-nage': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Projeção em círculo com o pé no abdômen' },
  'Kata-guruma': { kyu: '3kyu', gokyo: '3º Gokyo (Dai-Sankyo)', ptDesc: 'Roda sobre os ombros' },
  'Uki-gatame': { kyu: '3kyu', gokyo: 'Osaekomi Avançado', ptDesc: 'Imobilização flutuante' },
  'Uki-gatame Escapes': { kyu: '3kyu', gokyo: 'Defesa Osaekomi', ptDesc: 'Saídas de Uki-gatame' },
  'Ura-gatame': { kyu: '3kyu', gokyo: 'Osaekomi Avançado', ptDesc: 'Imobilização pelas costas / invertida' },
  'Ura-gatame Escapes': { kyu: '3kyu', gokyo: 'Defesa Osaekomi', ptDesc: 'Saídas de Ura-gatame' },
  'Nami-juji-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento cruzado normal (palmas para baixo)' },
  'Gyaku-juji-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento cruzado invertido (palmas para cima)' },
  'Kata-juji-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento meio cruzado' },
  'Hadaka-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento nu (sem uso da gola)' },
  'Okuri-eri-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento deslizando as duas golas' },
  'Kataha-jime': { kyu: '3kyu', gokyo: 'Shime-waza Base', ptDesc: 'Estrangulamento controlando gola e uma asa (braço)' },

  // 2º KYU - Dai-Yonkyo (4º Grupo Gokyo) + Shime Avançado & Kansetsu Base
  'Sumi-gaeshi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Inversão pelo ângulo com gancho na coxa' },
  'Tani-otoshi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Queda no vale (sacrifício lateral para trás)' },
  'Hane-makikomi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Enrolamento com quadril saltitante' },
  'Sukui-nage': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Projeção em colherada' },
  'Utsuri-goshi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Troca / transferência de quadril em contragolpe' },
  'O-guruma': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Grande roda sobre a perna alta' },
  'Soto-makikomi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Enrolamento externo com o corpo' },
  'Uki-otoshi': { kyu: '2kyu', gokyo: '4º Gokyo (Dai-Yonkyo)', ptDesc: 'Queda flutuante (técnica clássica de Nage-no-Kata)' },
  'Katate-jime': { kyu: '2kyu', gokyo: 'Shime-waza Avançado', ptDesc: 'Estrangulamento com uma mão' },
  'Ryote-jime': { kyu: '2kyu', gokyo: 'Shime-waza Avançado', ptDesc: 'Estrangulamento com ambas as mãos nas golas' },
  'Sode-guruma-jime': { kyu: '2kyu', gokyo: 'Shime-waza Avançado', ptDesc: 'Estrangulamento em roda usando a manga (Ezequiel)' },
  'Tsukkomi-jime': { kyu: '2kyu', gokyo: 'Shime-waza Avançado', ptDesc: 'Estrangulamento estocando a gola' },
  'Sankaku-jime': { kyu: '2kyu', gokyo: 'Shime-waza Avançado', ptDesc: 'Estrangulamento em triângulo com as pernas' },
  'Do-jime': { kyu: '2kyu', gokyo: 'Shime-waza (Proibido em Shiai)', ptDesc: 'Compressão de tronco com as pernas (tesoura)' },
  'Ude-garami': { kyu: '2kyu', gokyo: 'Kansetsu-waza Base', ptDesc: 'Torção de braço flexionado (Kimura / Americana)' },
  'Ude-hishigi-juji-gatame': { kyu: '2kyu', gokyo: 'Kansetsu-waza Base', ptDesc: 'Chave de braço cruzada (Armlock clássico)' },
  'Ude-hishigi-ude-gatame': { kyu: '2kyu', gokyo: 'Kansetsu-waza Base', ptDesc: 'Chave hiperestendendo o cotovelo com as mãos' },
  'Ude-hishigi-hiza-gatame': { kyu: '2kyu', gokyo: 'Kansetsu-waza Base', ptDesc: 'Chave de braço com apoio do joelho' },
  'Ude-hishigi-waki-gatame': { kyu: '2kyu', gokyo: 'Kansetsu-waza Base', ptDesc: 'Chave de braço usando a axila' },

  // 1º KYU - Dai-Gokyo (5º Grupo Gokyo) + Kansetsu Avançado
  'O-soto-guruma': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Grande roda externa sobre ambas as pernas' },
  'Uki-waza': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Técnica de sacrifício flutuante lateral' },
  'Yoko-wakare': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Separação lateral em sacrifício' },
  'Yoko-guruma': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Roda lateral em sacrifício' },
  'Ushiro-goshi': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Projeção de quadril por trás (contragolpe)' },
  'Ura-nage': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Projeção para trás em sacrifício (Suplex do Judô)' },
  'Sumi-otoshi': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Queda no ângulo (desequilíbrio puro de mão)' },
  'Yoko-gake': { kyu: '1kyu', gokyo: '5º Gokyo (Dai-Gokyo)', ptDesc: 'Enganchamento lateral com queda conjunta' },
  'Ude-hishigi-hara-gatame': { kyu: '1kyu', gokyo: 'Kansetsu-waza Avançado', ptDesc: 'Chave de braço pressionando com o abdômen' },
  'Ude-hishigi-ashi-gatame': { kyu: '1kyu', gokyo: 'Kansetsu-waza Avançado', ptDesc: 'Chave de braço usando a perna' },
  'Ude-hishigi-te-gatame': { kyu: '1kyu', gokyo: 'Kansetsu-waza Avançado', ptDesc: 'Chave de braço controlada com as mãos' },
  'Ude-hishigi-sankaku-gatame': { kyu: '1kyu', gokyo: 'Kansetsu-waza Avançado', ptDesc: 'Chave de braço a partir do triângulo (Sankaku)' },
  'Ashi-garami': { kyu: '1kyu', gokyo: 'Kansetsu-waza (Katame-no-Kata)', ptDesc: 'Chave entrelaçando a perna (restrita a Kata)' }
};

const RAW_PLAYLIST_VIDEOS = [
  { index: 1, videoId: '_GxcFx8LZRk', title: 'KODOKAN JUDO 100 Techniques PV', duration: '1:35' },
  { index: 2, videoId: 'zIq0xI0ogxk', title: '背負投 / Seoi-nage', duration: '1:20' },
  { index: 3, videoId: 'FQnOlCxo4oI', title: '一本背負投 / Ippon-seoi-nage', duration: '0:54' },
  { index: 4, videoId: 'vu1TMVNnq34', title: '背負落 / Seoi-otoshi', duration: '1:21' },
  { index: 5, videoId: '4x6S3Q-Ktv8', title: '体落 / Tai-otoshi', duration: '1:16' },
  { index: 6, videoId: 'cnHRhSy8yi4', title: '肩車 / Kata-guruma', duration: '1:10' },
  { index: 7, videoId: 'vU6aJ2kFxoI', title: '掬投 / Sukui-nage', duration: '1:47' },
  { index: 8, videoId: 'ff8U2TVZIYI', title: '帯落 / Obi-otoshi', duration: '1:15' },
  { index: 9, videoId: '6H5tmncOY4Q', title: '浮落 / Uki-otoshi', duration: '0:56' },
  { index: 10, videoId: 'lLU9wv52ni0', title: '隅落 / Sumi-otoshi', duration: '0:52' },
  { index: 11, videoId: 'MGlyKmSuzdc', title: '山嵐 / Yama-arashi', duration: '1:25' },
  { index: 12, videoId: 'bpc82SrunUU', title: '帯取返 / Obi-tori-gaeshi', duration: '1:27' },
  { index: 13, videoId: 'BHLQS4K85bs', title: '双手刈 / Morote-gari', duration: '0:49' },
  { index: 14, videoId: 'ZNL47q1aJNY', title: '朽木倒 / Kuchiki-taoshi', duration: '1:09' },
  { index: 15, videoId: 'tJylJYfBliA', title: '踵返 / Kibisu-gaeshi', duration: '1:03' },
  { index: 16, videoId: 'V-RS3uhtVWM', title: '内股すかし / Uchi-mata-sukashi', duration: '0:51' },
  { index: 17, videoId: '_MWAdYi_LC4', title: '小内返 / Ko-uchi-gaeshi', duration: '1:36' },
  { index: 18, videoId: 'z5qYfCEcZOU', title: '手技 / Te-waza', duration: '1:28' },
  { index: 19, videoId: 'bPKwtB4lyOQ', title: '浮腰 / Uki-goshi', duration: '0:52' },
  { index: 20, videoId: 'yhu1mfy2vJ4', title: '大腰 / O-goshi', duration: '1:26' },
  { index: 21, videoId: 'SU7Id6uVJ44', title: '腰車 / Koshi-guruma', duration: '1:10' },
  { index: 22, videoId: 'McfzA0yRVt4', title: '釣込腰 / Tsurikomi-goshi', duration: '1:29' },
  { index: 23, videoId: 'QsmAxpmYLOI', title: '袖釣込腰 / Sode-tsurikomi-goshi', duration: '1:37' },
  { index: 24, videoId: 'qTo8HlAAkOo', title: '払腰 / Harai-goshi', duration: '1:12' },
  { index: 25, videoId: '51Htlp7xEvE', title: '釣腰 / Tsuri-goshi', duration: '1:42' },
  { index: 26, videoId: 'M9_7De6A1kk', title: '跳腰 / Hane-goshi', duration: '1:17' },
  { index: 27, videoId: '4pQd_bEnlf0', title: '移腰 / Utsuri-goshi', duration: '0:59' },
  { index: 28, videoId: 'ORIYstuxYT8', title: '後腰 / Ushiro-goshi', duration: '1:04' },
  { index: 29, videoId: 'cgIby7HnKzA', title: '腰技 / Koshi-waza', duration: '0:58' },
  { index: 30, videoId: '4BUUvqxi_Kk', title: '出足払 / De-ashi-harai', duration: '1:18' },
  { index: 31, videoId: 'JPJx9-oAVns', title: '膝車 / Hiza-guruma', duration: '1:26' },
  { index: 32, videoId: '699i--pvYmE', title: '支釣込足 / Sasae-tsurikomi-ashi', duration: '1:14' },
  { index: 33, videoId: 'c-A_nP7mKAc', title: '大外刈 / O-soto-gari', duration: '1:45' },
  { index: 34, videoId: '0itJFhV9pDQ', title: '大内刈 / O-uchi-gari', duration: '1:28' },
  { index: 35, videoId: 'jeQ541ScLB4', title: '小外刈 / Ko-soto-gari', duration: '0:57' },
  { index: 36, videoId: '3Jb3tZvr9Ng', title: '小内刈 / Ko-uchi-gari', duration: '1:32' },
  { index: 37, videoId: 'nw1ZdRjrdRI', title: '送足払 / Okuri-ashi-harai', duration: '1:59' },
  { index: 38, videoId: 'iUpSu5J-bgw', title: '内股 / Uchi-mata', duration: '1:51' },
  { index: 39, videoId: '8b6kY4s4zH4', title: '小外掛 / Ko-soto-gake', duration: '1:34' },
  { index: 40, videoId: 'ROeayhvom9U', title: '足車 / Ashi-guruma', duration: '0:57' },
  { index: 41, videoId: 'gGPXvWL8VbE', title: '払釣込足 / Harai-tsurikomi-ashi', duration: '1:34' },
  { index: 42, videoId: 'SnZciTAY9vc', title: '大車 / O-guruma', duration: '1:00' },
  { index: 43, videoId: '92KbCm6pQeI', title: '大外車 / O-soto-guruma', duration: '1:01' },
  { index: 44, videoId: '2DsVvDw7b8g', title: '大外落 / O-soto-otoshi', duration: '1:04' },
  { index: 45, videoId: 'GwweWqqFB5g', title: '燕返 / Tsubame-gaeshi', duration: '1:04' },
  { index: 46, videoId: '8ZjM3X_EANo', title: '大外返 / O-soto-gaeshi', duration: '1:14' },
  { index: 47, videoId: 'dCyZTXyjIXE', title: '大内返 / O-uchi-gaeshi', duration: '1:02' },
  { index: 48, videoId: '9bZAZSBtnGs', title: '跳腰返 / Hane-goshi-gaeshi', duration: '0:42' },
  { index: 49, videoId: '4U3It-7PPsc', title: '払腰返 / Harai-goshi-gaeshi', duration: '0:43' },
  { index: 50, videoId: 'Sy6sLWxkWYw', title: '内股返 / Uchi-mata-gaeshi', duration: '0:44' },
  { index: 51, videoId: '-Xpmgtaypmg', title: '足技 / Ashi-waza', duration: '2:11' },
  { index: 52, videoId: '880WbHvHv6A', title: '巴投 / Tomoe-nage', duration: '0:55' },
  { index: 53, videoId: '5VhduA5xkbA', title: '隅返 / Sumi-gaeshi', duration: '1:01' },
  { index: 54, videoId: '92zUYWBp5N8', title: '引込返 / Hikikomi-gaeshi', duration: '0:59' },
  { index: 55, videoId: 'TmTWgrmViZc', title: '俵返 / Tawara-gaeshi', duration: '1:06' },
  { index: 56, videoId: 'Fgi9b8DJ5sQ', title: '裏投 / Ura-nage', duration: '0:29' },
  { index: 57, videoId: 'LnjW67efl00', title: '真捨身技 / Ma-sutemi-waza', duration: '0:44' },
  { index: 58, videoId: 'MnNG67pF_a0', title: '横落 / Yoko-otoshi', duration: '0:54' },
  { index: 59, videoId: '3b9Me3Fohpk', title: '谷落 / Tani-otoshi', duration: '1:19' },
  { index: 60, videoId: '6CRBGLGz9j8', title: '跳巻込 / Hane-makikomi', duration: '1:00' },
  { index: 61, videoId: 'bWG9O1BVKtQ', title: '外巻込 / Soto-makikomi', duration: '0:58' },
  { index: 62, videoId: '5BowcjduxVc', title: '内巻込 / Uchi-makikomi', duration: '1:07' },
  { index: 63, videoId: 'weVOpJ63gII', title: '浮技 / Uki-waza', duration: '1:03' },
  { index: 64, videoId: 'bp1tscHlePI', title: '横分 / Yoko-wakare', duration: '1:35' },
  { index: 65, videoId: 'MehP6I5cY2c', title: '横車 / Yoko-guruma', duration: '1:12' },
  { index: 66, videoId: 'tP1Sj1uDfSo', title: '横掛 / Yoko-gake', duration: '1:07' },
  { index: 67, videoId: 'Hr0cOMGBDYo', title: '抱分 / Daki-wakare', duration: '1:13' },
  { index: 68, videoId: 'DGDv2oMwmas', title: '大外巻込 / O-soto-makikomi', duration: '1:10' },
  { index: 69, videoId: 'jZXENTLpJCI', title: '内股巻込 / Uchi-mata-makikomi', duration: '0:51' },
  { index: 70, videoId: 'VBaHzKaCXss', title: '払巻込 /  Harai-makikomi', duration: '1:07' },
  { index: 71, videoId: '_1eygIXLD_w', title: '小内巻込 /  Ko-uchi-makikomi', duration: '1:01' },
  { index: 72, videoId: 'OR-HGHnarYc', title: '蟹挟 /  Kani-basami', duration: '0:44' },
  { index: 73, videoId: 'w6G57bWACi0', title: '河津掛 /  Kawazu-gake', duration: '0:34' },
  { index: 74, videoId: 'ml_eSxz8OMo', title: '横捨身技 / Yoko-sutemi-waza', duration: '1:36' },
  { index: 75, videoId: 'NDaQuJOFBYk', title: '袈裟固 /  Kesa-gatame', duration: '0:57' },
  { index: 76, videoId: '5_TS0YHdxcQ', title: '袈裟固の逃れ方 /  Kesa-gatame Escapes', duration: '2:19' },
  { index: 77, videoId: 'Q2fb9jaoUFQ', title: '崩袈裟固 /  Kuzure-kesa-gatame', duration: '0:58' },
  { index: 78, videoId: '-zFQ6h4yKT4', title: '崩袈裟固の逃れ方 /  Kuzure-kesa-gatame Escapes', duration: '1:10' },
  { index: 79, videoId: 'SBapox2M2dE', title: '後袈裟固 /  Ushiro-kesa-gatame', duration: '0:54' },
  { index: 80, videoId: '4QuzAAucQsA', title: '後袈裟固の逃れ方 /  Ushiro-kesa-gatame Escapes', duration: '1:01' },
  { index: 81, videoId: 'zQR3IOXxO_Q', title: '肩固 /  Kata-gatame', duration: '0:48' },
  { index: 82, videoId: '7hP1-W2yovk', title: '肩固の逃れ方 /  Kata-gatame Escapes', duration: '1:14' },
  { index: 83, videoId: 'HFuMjOv0WN8', title: '上四方固 /  Kami-shiho-gatame', duration: '0:42' },
  { index: 84, videoId: 'seGsXy9I4G8', title: '上四方固の逃れ方 /  Kami-siho-gatame Escapes', duration: '1:35' },
  { index: 85, videoId: 'YUrogQWdwiY', title: '崩上四方固 /  Kuzure-kami-shiho-gatame', duration: '1:22' },
  { index: 86, videoId: 'PPe7E_7d7UI', title: '崩上四方固の逃れ方 /  Kuzure-kami-siho-gatame Escapes', duration: '1:10' },
  { index: 87, videoId: 'TT7XJVSEQxA', title: '横四方固 /  Yoko-shiho-gatame', duration: '1:53' },
  { index: 88, videoId: 'yK_GSamSPko', title: '横四方固の逃れ方 /  Yoko-shiho-gatame Escapes', duration: '1:22' },
  { index: 89, videoId: '55-rFmBx53g', title: '縦四方固 /  Tate-shiho-gatame', duration: '0:46' },
  { index: 90, videoId: 'JMJBjnst_DA', title: '縦四方固の逃れ方 /  Tate-shiho-gatame Escapes', duration: '1:08' },
  { index: 91, videoId: 'e_lAjik1SUM', title: '浮固 /  Uki-gatame', duration: '0:45' },
  { index: 92, videoId: 'AMHWDFR4ryo', title: '浮固の逃れ方 /  Uki-gatame Escapes', duration: '1:12' },
  { index: 93, videoId: 'eeAHZB0v3XY', title: '裏固 /  Ura-gatame', duration: '1:27' },
  { index: 94, videoId: '0aY2Tmchzs8', title: '裏固の逃れ方 /  Ura-gatame Escapes', duration: '0:50' },
  { index: 95, videoId: 'guJ-HlAKEA8', title: '抑込技 / Osaekomi-waza', duration: '4:13' },
  { index: 96, videoId: 'k2cHry9HByQ', title: '並十字絞 /  Nami-juji-jime', duration: '0:56' },
  { index: 97, videoId: 't3tQriIPdlI', title: '逆十字絞 /  Gyaku-juji-jime', duration: '1:15' },
  { index: 98, videoId: '3VZVUAmiMD8', title: '片十字絞 /  Kata-juji-jime', duration: '2:34' },
  { index: 99, videoId: '9f0n8jez7iA', title: '裸絞 /  Hadaka-jime', duration: '1:20' },
  { index: 100, videoId: 'EiqyoVcIAi8', title: '送襟絞 /  Okuri-eri-jime', duration: '1:24' },
  { index: 101, videoId: 'yaTGgRjnwB8', title: '片羽絞 /  Kataha-jime', duration: '1:09' },
  { index: 102, videoId: 'cHeIs-fSqwE', title: '片手絞 /  Katate-jime', duration: '0:49' },
  { index: 103, videoId: '-RHC4V7TQiY', title: '両手絞 /  Ryote-jime', duration: '1:06' },
  { index: 104, videoId: 'E3nvQzClcAU', title: '袖車絞 /  Sode-guruma-jime', duration: '1:14' },
  { index: 105, videoId: 'dKKpnD3eLcY', title: '突込絞 /  Tsukkomi-jime', duration: '1:18' },
  { index: 106, videoId: 'lq1CUBRAm7s', title: '三角絞 /  Sankaku-jime', duration: '0:59' },
  { index: 107, videoId: 'D_0fFcoIbvY', title: '胴絞 /  Do-jime', duration: '1:06' },
  { index: 108, videoId: 'bq3cwrcS1-c', title: '絞技 / Shime-waza', duration: '3:33' },
  { index: 109, videoId: 'AIlTvZb4RlE', title: '腕緘 /  Ude-garami', duration: '1:31' },
  { index: 110, videoId: 'OWgSOlCuMXw', title: '腕挫十字固 /  Ude-hishigi-juji-gatame', duration: '1:12' },
  { index: 111, videoId: 'SBf0aTma1VI', title: '腕挫腕固 /  Ude-hishigi-ude-gatame', duration: '0:50' },
  { index: 112, videoId: 'H2HtAJdiJcE', title: '腕挫膝固 /  Ude-hishigi-hiza-gatame', duration: '1:05' },
  { index: 113, videoId: '8F5p1zuJRG0', title: '腕挫腋固 /  Ude-hishigi-waki-gatame', duration: '0:53' },
  { index: 114, videoId: 'ZzEycg8R_9M', title: '腕挫腹固 /  Ude-hishigi-hara-gatame', duration: '0:55' },
  { index: 115, videoId: 'ClY7g_pX-4s', title: '腕挫脚固 /  Ude-hishigi-ashi-gatame', duration: '1:05' },
  { index: 116, videoId: '6DnvhY0tQVM', title: '腕挫手固 /  Ude-hishigi-te-gatame', duration: '1:00' },
  { index: 117, videoId: 'WefAmW4azhk', title: '腕挫三角固 /  Ude-hishigi-sankaku-gatame', duration: '1:15' },
  { index: 118, videoId: 'BWWb0GoAtZw', title: '足緘 /  Ashi-garami', duration: '1:08' },
  { index: 119, videoId: 'QtVipMcTsdw', title: '関節技 / Kansetsu-waza', duration: '1:34' }
];

function getWazaCategoryByIndex(index) {
  if (index === 1) return { cat: 'Te-waza', labelPt: 'Apresentação Oficial Kodokan' };
  if (index >= 2 && index <= 18) return { cat: 'Te-waza', labelPt: 'Te-waza • Técnica de Mão/Braço' };
  if (index >= 19 && index <= 29) return { cat: 'Koshi-waza', labelPt: 'Koshi-waza • Técnica de Quadril' };
  if (index >= 30 && index <= 51) return { cat: 'Ashi-waza', labelPt: 'Ashi-waza • Técnica de Perna/Pé' };
  if (index >= 52 && index <= 57) return { cat: 'Ma-sutemi-waza', labelPt: 'Ma-sutemi-waza • Sacrifício Frontal' };
  if (index >= 58 && index <= 74) return { cat: 'Yoko-sutemi-waza', labelPt: 'Yoko-sutemi-waza • Sacrifício Lateral' };
  if (index >= 75 && index <= 95) return { cat: 'Osaekomi-waza', labelPt: 'Osaekomi-waza • Imobilização' };
  if (index >= 96 && index <= 108) return { cat: 'Shime-waza', labelPt: 'Shime-waza • Estrangulamento' };
  return { cat: 'Kansetsu-waza', labelPt: 'Kansetsu-waza • Chave de Articulação' };
}

export function parseTechniqueTitle(rawTitle) {
  if (rawTitle.includes('/')) {
    const parts = rawTitle.split('/');
    return {
      kanji: parts[0].trim(),
      romaji: parts.slice(1).join('/').trim()
    };
  }
  return {
    kanji: '講道館柔道',
    romaji: rawTitle.trim()
  };
}

export const INITIAL_KODOKAN_VIDEOS = RAW_PLAYLIST_VIDEOS.map((item) => {
  const { kanji, romaji } = parseTechniqueTitle(item.title);
  const { cat, labelPt } = getWazaCategoryByIndex(item.index);
  const kyuInfo = KYU_MAP[romaji] || {
    kyu: 'extra',
    gokyo: item.title.includes('-waza') || item.index === 1 ? 'Compilação Oficial Kodokan' : 'Shinmeisho / Habukareta-waza',
    ptDesc: item.title.includes('-waza')
      ? 'Vídeo resumo oficial da divisão no Kodokan'
      : 'Técnica oficial complementar do currículo Kodokan'
  };

  const kyuMeta = KYU_LEVELS.find((k) => k.id === kyuInfo.kyu) || KYU_LEVELS[5];

  return {
    id: `kodokan-${item.videoId}`,
    playlistIndex: item.index,
    videoId: item.videoId,
    title: item.title,
    kanji,
    romaji,
    duration: item.duration,
    kyu: kyuInfo.kyu,
    kyuLabel: kyuMeta.label,
    kyuOrder: kyuMeta.order,
    gokyo: kyuInfo.gokyo,
    ptDesc: kyuInfo.ptDesc,
    wazaCategory: cat,
    wazaLabelPt: labelPt,
    playlistId: 'PLtz539PTepc16H2iu5F3Q3D7_He1EYlIQ',
    playlistTitle: 'KODOKAN JUDO 100 Techniques',
    thumbnail: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
  };
}).sort((a, b) => {
  if (a.kyuOrder !== b.kyuOrder) return a.kyuOrder - b.kyuOrder;
  return a.playlistIndex - b.playlistIndex;
});
