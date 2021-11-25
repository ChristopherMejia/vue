app.component("product", {
    template: `
    <section class="product">
        <div class="product__thumbnails">
            <div
                v-for="(image, index) in product.images"
                :key="image.thumbnail"
                class="thumb" 
                :class="{ active: activeImage === index }" 
                :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')' }"
                @click="activeImage = index">
            </div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name">
        </div>
    </section>
    <section class="description">
        <h4>{{product.name.toUpperCase()}} {{product.stock === 0 ? "😭" : "😎"}}</h4>
        <badge :product="product"></badge>
        <p class="description__status" v-if="product.stock > 3">Disponible</p>
        <p class="description__status" v-else-if="product.stock === 3">Quedan pocas unidades</p>
        <p class="description__status" v-else-if="product.stock === 2">El producto esta por terminarse</p>
        <p class="description__status" v-else>Ultima unidad disponible</p>
        
        <p class="description__price" :style="{color: price_color}">
            $ {{product.price}}
        </p>
        
        <p class="description__content"></p>
        <div class="discount">
            <span>Codigo de Descuento:</span>
            <input type="text" 
                placeholder="Ingresa tu código" 
                @keyup.enter="applyDiscount($event) "/>
        </div>
        <button 
            :disabled="product.stock === 0"
            @click="sendToCart()">Agregar al carrito</button>
    </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],
    setup(props, context){

        const productState = reactive({
            activeImage : 0,
            price_color : "rgb(104, 104, 209)",
        });

        function sendToCart() {
            context.emit("sendtocart", props.product);
        }

        const discountCodes = ref(["platzi20", "iosamuel"]);
        function applyDiscount(event){
            const discountCodesIndex = discountCodes.value.indexOf(event.target.value);
            if(discountCodesIndex >= 0){
                props.product.price *= 50 / 100;
                discountCodes.value.splice(discountCodesIndex, 1)
            }
        }

        watch( () => productState.activeImage, (value, oldValue) => {
            console.log(value, oldValue);
        })

        watch(() => props.product.stock, (stock) => {
            console.log(stock);
            if(stock <= 1) {
                productState.price_color ="rgb(188 30 67)";
            }
        })

        return {
            ... toRefs(productState),
            sendToCart,
            applyDiscount,
        }
    }
})