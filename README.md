# DuoTone

DuoTone project is API for applying effects onto an image, such as a duotone effect (two color tones image);

## Getting Started

To run locally:

```
  npm run dev
```

To apply an effect, just use the desired effect name as a route, Ex:

´´´
  /duotone?image=URLimage&color=green
´´´

### Duotone Effect

**Caminho**: `GET <endpoint>/duotone?image&color&primaryColor&secondaryColor`

**Descrição**: Generates a new imagem from the source image with a duotone effect.

The color query paramater accepts only predetermined colors, wich in turn generates the primary and secondary colors for the effect. The avaliable colors are:

- gray or grey (Primary: #FBFBFB, Secondary: #283B6B)
- yellow (Primary: #FCC862, Secondary: #2D45C6)
- green (Primary: #71DF6F, Secondary: #272D67)
- red (Primary: #D92037, Secondary: #2A3060)
- purple (Primary: #8ADFD0, Secondary: #5C2998)
- sand (Primary: #FCC862, Secondary: #2D45C6)
- tomato (Primary: #A3D5CA, Secondary: #E52839)

The primaryColor and secondaryColor query parameters accept hexaDecimal values an can be use to generate a duotone effect with any color combination.


**REQUEST**:

***Path***

| Field              | Description                  | Format | Obligatory |
| ------------------ | ---------------------------- | :----: | :--------: |
| **image**          | image URL                    | Text   | Yes        |
| **color**          | Default Colors Ex:green      | Text   | No         |
| **primaryColor**   | Primary Color of the Image   | Hex    | No         |
| **secondaryColor** | Secondary Color of the Image | Hex    | No         |
