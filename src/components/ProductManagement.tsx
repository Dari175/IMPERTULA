import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Edit, Trash2, Save, X, Upload, Link as LinkIcon, Star, Upload, Link as LinkIcon, Star, Upload, Link as LinkIcon, Star } from "lucide-react";
import { Product, productApi } from "../lib/api";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageType, setImageType] = useState<'url' | 'base64'>('url');
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const [imageType, setImageType] = useState<'url' | 'base64'>('url');
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const [imageType, setImageType] = useState<'url' | 'base64'>('url');
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<{ data: string; mimeType: string; name: string } | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productApi.getAll();
      // Asegurarse de que data sea un array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === 'object') {
        const productsArray = (data as any).data || (data as any).products || [];
        setProducts(Array.isArray(productsArray) ? productsArray : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      toast.error("Error al cargar productos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      category: "",
      description: "",
      image: "",
      brand: "Fester",
      fullDescription: "",
      features: [],
      applications: [],
      specifications: {
        presentation: "",
        coverage: "",
        dryingTime: "",
        colors: ""
      }
    });
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
  };

  const handleEdit = (product: Product) => {
    const productId = product._id || product.id || "";
    setEditingId(productId as any);
    setFormData(product);
    setImageUrl(product.image || "");
    setImageFile(null);
    setImageUrl(product.image || "");
    setImageFile(null);
    setImageUrl(product.image || "");
    setImageFile(null);
  };

  const handleSave = async () => {
    try {
      // Validaciones básicas
      if (!formData.name?.trim()) {
        toast.error("El nombre del producto es obligatorio");
        return;
      }
      if (!formData.category?.trim()) {
        toast.error("La categoría es obligatoria");
        return;
      }
      if (!formData.brand) {
        toast.error("La marca es obligatoria");
        return;
      }
      if (!formData.description?.trim()) {
        toast.error("La descripción es obligatoria");
        return;
      }

      // Validar que haya imagen (URL o archivo)
      let imageData = formData.image;
      if (imageType === 'url' && imageUrl.trim()) {
        imageData = imageUrl;
      } else if (imageType === 'base64' && imageFile) {
        imageData = `data:${imageFile.mimeType};base64,${imageFile.data}`;
      }

      if (!imageData) {
        toast.error("La imagen es obligatoria");
        return;
      }

      // Validar que haya imagen (URL o archivo)
      let imageData = formData.image;
      if (imageType === 'url' && imageUrl.trim()) {
        imageData = imageUrl;
      } else if (imageType === 'base64' && imageFile) {
        imageData = `data:${imageFile.mimeType};base64,${imageFile.data}`;
      }

      if (!imageData) {
        toast.error("La imagen es obligatoria");
        return;
      }

      // Validar que haya imagen (URL o archivo)
      let imageData = formData.image;
      if (imageType === 'url' && imageUrl.trim()) {
        imageData = imageUrl;
      } else if (imageType === 'base64' && imageFile) {
        imageData = `data:${imageFile.mimeType};base64,${imageFile.data}`;
      }

      if (!imageData) {
        toast.error("La imagen es obligatoria");
        return;
      }

      if (isCreating) {
        const { _id, id, rating, rating, rating, ...productData } = formData as any;
        ppprododoductDctDctData.a.a.imamamage === iiimagagageData;DaData;ta;
        // N// N// No envi envi enviar r r rating,,,s se calculas  á lcullculaá á utomáutomácamecameteteutomáticamente
        
        console.log("Enviando producto:", productData);
        await productApi.create(productData);
        toast.success("Producto creado exitosamente");
      } else if (editingId) {
        const { _id, id, rating, rating, rating, ...productData } = formData as any;
        productData.image = imageData;
        // No actualizar el imamagee desde iiagageData;
        // Nl aData;
        // N a amin, se cuualizlcullizar el r el  desde el admin, se calcula desde el admin, se calcula desdedesde lasdesde las reseñasreseñaslas reseñas
        await productApi.update(editingId.toString(), productData);
        toast.success("Producto actualizado exitosamente");
      }
      await loadProducts();
      handleCancel();
    } catch (error: any) {
      console.error("Error al guardar producto:", error);
      toast.error(error.message || "Error al guardar el producto");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    
    try {
      await productApi.delete(id);
      toast.success("Producto eliminado exitosamente");
      await loadProducts();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar el producto");
    }
  };

  const handleCancel = () => {
    // Verificar si hay cambios sin guardar
    const hasUnsavedChanges = 
      (isCreating || editingId) && 
      (formData.name || formData.description || imageUrl || imageFile);

    if (hasUnsavedChanges) {
      const confirmCancel = confirm(
        "¿Estás seguro de que deseas descartar los cambios? Todos los datos no guardados se perderán."
      );
      if (!confirmCancel) return;
    }

    // Verificar si hay cambios sin guardar
    const hasUnsavedChanges = 
      (isCreating || editingId) && 
      (formData.name || formData.description || imageUrl || imageFile);

    if (hasUnsavedChanges) {
      const confirmCancel = confirm(
        "¿Estás seguro de que deseas descartar los cambios? Todos los datos no guardados se perderán."
      );
      if (!confirmCancel) return;
    }

    // Verificar si hay cambios sin guardar
    const hasUnsavedChanges = 
      (isCreating || editingId) && 
      (formData.name || formData.description || imageUrl || imageFile);

    if (hasUnsavedChanges) {
      const confirmCancel = confirm(
        "¿Estás seguro de que deseas descartar los cambios? Todos los datos no guardados se perderán."
      );
      if (!confirmCancel) return;
    }

    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
    setImageType('url');
    setImageUrl("");
    setImageFile(null);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSpecification = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      } as any
    }));
  };

  const updateArrayField = (field: "features" | "applications", value: string) => {
    const items = value.split("\n").filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  // Convertir archivo a Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Manejar carga de archivo local
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    // Validar tamaño (máximo 2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error(`La imagen excede el tamaño máximo permitido (2MB). Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      // Extraer solo el data sin el prefijo data:image/...;base64,
      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        setImageFile({
          name: file.name,
          mimeType: matches[1],
          data: matches[2]
        });
        toast.success('Imagen cargada correctamente');
      }
    } catch (error) {
      toast.error('Error al procesar la imagen');
      console.error(error);
    }
  };

  // Convertir archivo a Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Manejar carga de archivo local
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    // Validar tamaño (máximo 2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error(`La imagen excede el tamaño máximo permitido (2MB). Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      // Extraer solo el data sin el prefijo data:image/...;base64,
      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        setImageFile({
          name: file.name,
          mimeType: matches[1],
          data: matches[2]
        });
        toast.success('Imagen cargada correctamente');
      }
    } catch (error) {
      toast.error('Error al procesar la imagen');
      console.error(error);
    }
  };

  // Convertir archivo a Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Manejar carga de archivo local
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    // Validar tamaño (máximo 2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error(`La imagen excede el tamaño máximo permitido (2MB). Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      // Extraer solo el data sin el prefijo data:image/...;base64,
      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        setImageFile({
          name: file.name,
          mimeType: matches[1],
          data: matches[2]
        });
        toast.success('Imagen cargada correctamente');
      }
    } catch (error) {
      toast.error('Error al procesar la imagen');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Gestión de Productos</h2>
        {!isCreating && !editingId && (
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Crear Nuevo Producto" : "Editar Producto"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Ej: Impermeabilizante Acrílico Premium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category || ""}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Impermeabilizantes">Impermeabilizantes</SelectItem>
                    <SelectItem value="Selladores">Selladores</SelectItem>
                    <SelectItem value="Adhesivos">Adhesivos</SelectItem>
                    <SelectItem value="Recubrimientos">Recubrimientos</SelectItem>
                    <SelectItem value="Membranas">Membranas</SelectItem>
                    <SelectItem value="Morteros">Morteros</SelectItem>
                    <SelectItem value="Pinturas">Pinturas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Marca *</Label>
                <Select
                  value={formData.brand || "Fester"}
                  onValueChange={(value) => updateField("brand", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fester">Fester</SelectItem>
                    <SelectItem value="Henkel">Henkel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                    </div>

</div>

            </divbg-blubg-blu50 border border-blue50 border border-blue00 rounded-lg p-400 rounded-lg p-4>

          <p<p clcldivssName="tssName="txt-smxt-sm texclassNatex-b-beue-800ue-800">
                <stb>
                <stong>Notong>Not:</s:</srorog-b La c La cluedeldel0 producto se cproducto se clculará automáticamente lculará automáticamente basándose ordasándose en rn as reseñas de los usuarios.as reseñas de los usuarios. bord   </p>
          </p>
       /div>

            {/* /div>

            {/* ististema dr-bma due-200imágenesimágenesconcontabstabsURL/LocalURL/Local */}
*/}
<div<divclassNclassNmm"space-y-4 border "space-y-4 border rououded-lded-l p-4 bg- p-4 bg-uuued/50">
              <Led/50">
              <Lbel clbel clssName="texssName="tex-base">Ima-base">Imaded-lgenen delp-4">delProducto *</Label>Producto *</Label>
              
<p
 c          <Tabs value={imageType}           <Tabs value={imageType} lassNm="setImsetImggeTypxTypv as 'uv as 'ul' | 'bl' | 'bse64')}>
                <TabsLisse64')}>
                <TabsList className="gr-sm className="grd w-full d w-full rid-cols-2rid-cols-2>
          >
                  <Tt       <TbbTriggTrigger xr -blue="url" className="gap-2">-800"="url" className="gap-2">    <LinkIcon className="h-4 w-4" /    <LinkIcon className="h-4 w-4" />
                  URL
                    URL
                  </Tabss/Tabsrong>NoTabsTriggTabsTriggr vr va:</st="b="bss64" c64" cassNamassNamgap-2">
                    <Upgap-2">
                    <Upog> Ladd classNassName="h-4 w-4me="h-4 w-4 d  Archivo Local
                    Archivo Local
                  TabsTabs produ</TabsList>

              </TabsList>

              TabsTabsovalue="url"value="url"className="space-y-3 mt-4">
className="space-y-3 mt-4">
 sdiv cdiv cassNamassName="spa ="spac-y-2">
-y-2">
                   <L                   <Labebel htmlForc htmlForimageUrlimageUrlURLURLde la Imagende la ImagenLabLablará npunpu
                     
                     id="imid="imageUrgeUr"
                      typ"
                      typurlurl
                  
                     plac   plachohoddr="hr="htomátps://imagicaps://imags.unsplash.cos.unsplash.com/..."/..."  n basándose{imageUrl}
                     {imageUrl}
                      onChange={onChange={ee => s => setImageUrntImageUr((..argearge.valu.valu)})} />
                  />
                  /div>
                  {imag/div>
                  {imagUrUrl && (
                    && (
                   <di<di cl classNamsssNamspace-y-space-y-
                     
                      rLabLabes>Vis>Visa Pra Previa</Labelñvia</Label    div classNamdiv classNam="bord="bordr roundr roundd-lgd-lgooerferfsow-hiddow-hiddnn
    
                        d                   ImagImageWithFaWithFalback
                          src={imaglback
                          src={imagUrl}
                          alUrl}
                          al="Previ="Previw"w"         classNam        classNam="w-fu="w-full h-48 objl h-48 obj-c-covsvr"r" usuarios.                
                              </p>
                            </div>
                  )}                  )}
                </TabsContent>

                <TabsContent value="base64" className="space-y-3 mt-4">
                      </TabsContent>

                <TabsContent value="base64" className="space-y-3 mt-4">
                  {/* Sistema de imágenes con tabs URL/Local */}
            <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
              <Label className="text-base">Imagen del Producto *</Label>
              
              <Tabs value={imageType} onValueChange={(v) => setImageType(v as 'url' | 'base64')}>
                <TabsList className="grid w-full grid-cols-2">
                   <TabsTrigger value="url" className="gap-2">
                    <LinkIcon className="h-4 w-4" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="base64" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Archivo Local
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-3 mt-4">
                  <div className="space-y-2">
                               <Label htmlFor="imageFileUrlFile">SSellla eccioccionararArchivoArchivo</Label>
                                <Input
                                  id="imageFileUrlFile"
                                  type="fifilee"
                            pl      acccehoccdeptpt""="https://iges.unsplshcom/..."
                      value={image/*"
    Url/*"
                          onChange={handlhandleFileUpload}
                   FileUpload}
                    //>

                    <setImageUrl(e.target.val                   <e)}
                    />
                  </ classN classNiv>
                  {imame="geUrl && (
                    <div className="space-y-2">
                      <Label>Visme="ta Prext-xs tvxt-xs ta</Labext-mutext-mute>
                      <d-foreground-foreground>
                      Tamaño máx>
                      Tamaño máxiv classNamo: 2MB. Forme="border rounded-lo: 2MB. Formtos: JPG, PNG, GIF, WebP
                    </p>
                    <p classNamtos: JPG, PNG, GIF, WebP
                    </p>
                    <p classNam ove=rflow-hidden="text-xs>
                text-xs t       <ImagtexWixt-blue-600">
                      💡 PhF-blue-600">
                      💡 Pallback
                          sra imác={imaa imágenes más grandes, usa URLs exUrl}
                          alnes más grandes, usa URLs externas
                    </p>
                  </di="Preernas
                    </p>
                  </div>
                  {imiew"
                          classN>
                  {imageFime="w-fgeFill h-48 obje && (ct-cover"
                        />
                      </div>
                    </div>
                   && (
                      <div className="s</TabsContent>

                <TabsContent value="base64" className="s  <div className="space-y-2">
                      <Labeace-y-3 mt-4">
                  <div cace-y-2">
                      <Label>Vist>Vista Previa</Label>
                      <div ssName="spa Previa</Label>
                      <div classNamlassName="border rounded-lg -y-2">
                    <Label ="border rounded-lg tmlFoverfr="imageFiverflow-hide">Seleccionar Archivo</Label>
                    <Input
                      iow-hidd="imagen">
                        <img
                          sFile"
                      typen">
                        <img
                          scc={`da{`dafile"
                      accept="image/*"
                      onCange={handleFileUpload}
                    />
                    <p className="ta:${imageFile.mimeTyext-xs a:${imageFile.mimeTyext-muted-foreground">
                      Tamaño máximo: 2MB. Formatos: JPG, PNG, GIF, WebP
                    </pe};ba>
                    <p className="text-xs text-blue-600">
                      💡 Para imágenes más grandes, ue};base64,${a URLs externas
                    <e64,${p>
                  <div>
                  {imageFileFile && (
                    <div claFilesName="space-y-2">
                      <Label>Vista Previa</Label>
                      <div className="border rodata}`}
                          alt="Preview"
                          cdata}`}
                          alt="Preview"
                          cded-lg overflow-hidden">
                        <img
                          rc={`data:${imageFile.mimeTye};base64,${imageFile.data}`}
                          alt="Preview"
                          className="w-full sName="w-full sName="w-full h-48 object--48 object--48 object-cover"
                        />
                      <ver"
                        />
                      <ver"
                        />
                      </div>div>div>
                             <p className="text-xs text-muted-fo <p className="text-xs text-muted-fo    <p className="text-xs text-muted-foregrogroground">
                        {nd">
                        {nd">
                        {imageFilmageFilmageFile.name}
                      </p>
                    </.name}
                      </p>
                    </.name}
                      </p>
                    </div>iv>iv>
                   )}
                <   )}
                <    )}
                </TabsContent>
              </TabsTabsContent>
              </TabsTabsContent>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Corta *</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                rows={2}
                placeholder="Descripción breve del producto (1-2 líneas)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Descripción Completa</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription || ""}
                onChange={(e) => updateField("fullDescription", e.target.value)}
                rows={4}
                placeholder="Descripción detallada del producto, sus beneficios y usos"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="features">Características (una por línea)</Label>
                <Textarea
                  id="features"
                  value={formData.features?.join("\n") || ""}
                  onChange={(e) => updateArrayField("features", e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applications">Aplicaciones (una por línea)</Label>
                <Textarea
                  id="applications"
                  value={formData.applications?.join("\n") || ""}
                  onChange={(e) => updateArrayField("applications", e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Especificaciones Técnicas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="presentation">Presentación</Label>
                  <Input
                    id="presentation"
                    value={formData.specifications?.presentation || ""}
                    onChange={(e) => updateSpecification("presentation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage">Rendimiento</Label>
                  <Input
                    id="coverage"
                    value={formData.specifications?.coverage || ""}
                    onChange={(e) => updateSpecification("coverage", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dryingTime">Tiempo de Secado</Label>
                  <Input
                    id="dryingTime"
                    value={formData.specifications?.dryingTime || ""}
                    onChange={(e) => updateSpecification("dryingTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colors">Colores</Label>
                  <Input
                    id="colors"
                    value={formData.specifications?.colors || ""}
                    onChange={(e) => updateSpecification("colors", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Los campos marcados con * son obligatorios
              </p>
              <div className="flex gap-3">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id || product.id} className="overflow-hidden">
            {product.image && (product.image && (product.image && (product.image.startsWith('http') || product.image.startsWith('data:')) || product.image.startsWith('data:')) || product.image.startsWith('data:')) ? (
              product.image.startsWith('http') ? (
                product.image.startsWith('http') ? (
                product.image.startsWith('http') ? (
                <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{product.brand}</Badge>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="flex-1 gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product._id || product.id || "")}
                  className="gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !isCreating && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No hay productos registrados</p>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Crear Primer Producto
          </Button>
        </Card>
      )}
    </div>
  );
}
