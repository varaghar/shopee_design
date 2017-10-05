# Basic Buttons

<img class="div-right" src="/static/image/sc-guideline/button-01.png" alt="">

按钮分为三类：Solid, Outline, Frameless

| 按钮       | 使用情境 |
| :--- | :--- |
| Solid     | 最常用的按钮，背景为实色填充        |
| Outline   | 背景透明的按钮，常用于有颜色的背景上 |
| Frameless | 视觉上弱视处理的按钮，常用于与“确认”操作成对出现的“取消”操作，或承载操作型符号 |

---

# Size

<img class="div-right" src="/static/image/sc-guideline/button-02.png" alt="">

基础按钮包含三种尺寸：默认为中性尺寸  

为按钮施加 compact 属性可更改左右两侧 padding 为8px  

为按钮施加full-width 属性可是按钮宽度变为容器的100% （此属性允许设计师自由指定按钮的宽度）

---

# Shape

<img class="div-right" src="/static/image/sc-guideline/button-03.png" alt="">

默认按钮为圆角矩形（圆角弧度为2px）；但为按钮添加 round 属性，则可以将按钮圆角增大，使按钮呈现圆形的边缘。

| Button Size | Round-corner |
| :--- |:--- |
| Large | 20px | 
| Default | 16px |
| Small | 12px |

> 注意：应限制 Round Button 的使用情境，仅限于展示页面而非功能页面。目前 Round Button 的使用将仅仅应用于登陆页。在功能页面内使用之则属于不规范的做法，应当慢慢去除。

---

# Text

默认按钮字体颜色为 #555555，字重为 Medium (500)。不同类型按钮文字填色有所不同，请按按钮类型进行设定。
文字大小基于按钮尺寸也有调整。

| Button Size | Text Size |
| :--- | :--- |
| Large | 14px |
| Default | 13px |
| small | 12px |

> 注意：受使用情境限制，可将 Frameless 样式设为全大写 (uppercase)。除此以外，所有按钮大小写设定为首字母大写 (capitalized)。

---

# Layout

<img class="div-right" src="/static/image/sc-guideline/button-04.png" alt="">

按钮内容包含以下三种：Text，SVG Icon + Text，Icon。无论何种内容，均需保持横向和纵向的视觉居中效果。

> 注意：SVG 图标与文字混排时，尺寸应与文字大小相同（如：14号字配合14*14px的图标），并保持垂直居中。

---

# Colors

颜色属性“color-”对不同类型的按钮造成的效果不同。

<img class="div-center" src="/static/image/sc-guideline/button-05.png" alt="">


---

# Status

页面中的按钮包括五种状态：

* Normal
* Hover 
* Active
* Disabled
* Focused

以下详述各类型按钮的五态及处理方式。

<img class="div-right" src="/static/image/sc-guideline/button-06.png" alt="">

## Hover

| 按钮 | 处理方式 |
| :--- | :--- |
| Solid,Frameless | 对背景添加透明度3%的黑色遮罩 |
| Outline | 添加与“color-”属性指定颜色相同的色彩遮罩，透明度8% |
| Danger | 对换背景颜色与内容颜色 |

## Active

| 按钮 | 处理方式 |
| :--- | :--- |
| Solid,Frameless | 对背景添加透明度6%的黑色遮罩 |
| Outline (default) | 背景颜色替换为“color-”属性指定颜色相同的颜色填充；文字颜色视底色深浅替换为默认按钮文字颜色 #555555 |
| Outline (others) | 背景颜色替换为“color-”属性指定颜色相同的颜色填充；文字颜色替换为白色。 |
| Danger | 对背景添加透明度6%的黑色遮罩 |











