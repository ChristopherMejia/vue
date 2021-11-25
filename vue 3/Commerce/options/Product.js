app.component("product", {
    template: /* vue-html */`
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
        <span class="badge new" v-if="product.new">Nuevo</span>
        <span class="badge offer" v-if="product.offer">Oferta</span>
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
                @keyup.enter=" applyDiscount($event) "/>
        </div>
        <button 
            :disabled="product.stock === 0"
            @click="sendToCart()">Agregar al carrito</button>
    </section>
    `,

    props: ["product"],
    emits: ["eventsendtocart"],
    data(){
        return{
          
            activeImage: 0,
            discountCodes: ["platzi20", "iosamuel"],
            price_color: "rgb(104, 104, 209)",

        }
    },

    methos:{
        applyDiscount(event) {
            const discountCodesIndex = this.discountCodes.indexOf(event.target.value);
            if(discountCodesIndex >= 0){
                this.product.price *= 50 / 100;
                this.discountCodes.splice(discountCodesIndex, 1)

            }
        },

        sendToCart(){
            this.$emit("eventsendtocart", this.product)
        }
    },

    watch: {
        activeImage(value, oldValue){
            console.log(value, oldValue);
        },
        "product.stock"(stock){
            if(stock <= 1){
                this.price_color = "rgb(188, 30, 67)";
            }
        }
    }
})