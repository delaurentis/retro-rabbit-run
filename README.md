# Rabbit Run

# GIFs

```
 ffmpeg -i rabbit-run-loop.gif -loop 0 -filter_complex "[0:v] scale=320:-1:flags=lanczos,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" rabbit-run-infinite.gif

  ffmpeg -i rabbit-start-run.gif -loop 0 -filter_complex "[0:v] scale=320:-1:flags=lanczos,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" rabbit-run-slow-infinite.gif

ffmpeg -i rabbit-jump.gif -loop 0 -filter_complex "[0:v] scale=320:-1:flags=lanczos,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" rabbit-jump-infinite.gif

ffmpeg -i hearts.gif -filter_complex "[0:v] scale=128:-1:flags=neighbor,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" fixed-rabbit-run-loop-infinite.gif


```

ffmpeg -y -i hearts.gif -filter_complex "[0:v] scale=128:-1:flags=neighbor,crop=80:100:30:18,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" hearts-small.gif