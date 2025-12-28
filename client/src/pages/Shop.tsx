import { useProducts, useCreateOrder } from "@/hooks/use-products";
import { useUser } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const { mutate: createOrder, isPending: isOrdering } = useCreateOrder();
  const { data: user } = useUser();
  const { toast } = useToast();

  const [cart, setCart] = useState<{ productId: number; quantity: number; product: any }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId: product.id, quantity: 1, product }];
    });
    toast({ title: "Added to Cart", description: `${product.name} added.` });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to place an order.", variant: "destructive" });
      return;
    }

    createOrder({
      items: cart.map(item => ({ productId: item.productId, quantity: item.quantity }))
    }, {
      onSuccess: () => {
        toast({ title: "Order Placed!", description: "Thank you for your purchase." });
        setCart([]);
        setIsCartOpen(false);
      },
      onError: () => {
        toast({ title: "Checkout Failed", description: "Please try again.", variant: "destructive" });
      }
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-primary"><Loader2 className="w-10 h-10 animate-spin" /></div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gold-text-gradient mb-2">
              Astro Store
            </h1>
            <p className="text-gray-400">Authentic Spiritual Products</p>
          </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full bg-card border border-white/10 hover:bg-white/10 text-white relative">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#1a0b2e] border-l border-white/10 text-white sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-white font-display text-2xl">Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">Your cart is empty</div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex gap-4 items-center bg-white/5 p-4 rounded-lg">
                         {/* Product thumbnail */}
                         <div className="w-16 h-16 rounded-md overflow-hidden bg-black/40 flex-shrink-0">
                           <img src={item.product.imageUrl} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                           <h4 className="font-semibold">{item.product.name}</h4>
                           <p className="text-primary text-sm">₹{item.product.price}</p>
                           <div className="flex items-center gap-2 mt-2">
                             <button onClick={() => updateQuantity(item.productId, -1)} className="p-1 hover:text-white text-gray-400"><Minus size={14}/></button>
                             <span className="text-sm w-4 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.productId, 1)} className="p-1 hover:text-white text-gray-400"><Plus size={14}/></button>
                           </div>
                         </div>
                         <button onClick={() => removeFromCart(item.productId)} className="text-gray-500 hover:text-destructive transition-colors">
                           <X size={18} />
                         </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <Button onClick={handleCheckout} disabled={isOrdering} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg">
                    {isOrdering ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  <Button onClick={() => addToCart(product)} size="sm" className="bg-white/10 hover:bg-white/20 text-white rounded-full">
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
