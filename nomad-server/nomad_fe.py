from tkinter import *
from PIL import ImageTk,Image
import requests
from io import BytesIO

splashscreen = './images/nomad_splashscreen.png'

global tk, my_canvas, counter
counter = 0

MAX_PIXL_SIZE = 600

tk = Tk()
tk.geometry("1000x667")
tk.title('Nomad portable NFT Frame Demo')
tk.attributes("-fullscreen", True)

#Create canvas
my_canvas = Canvas(tk, width=800, height=800)
my_canvas.pack(fill="both", expand=True)

def initialise_fe(input_img_URI):
    global nomad_image

    img = Image.open(input_img_URI)

    #Resize images to MAX_PIXL_SIZE
    [imageSizeWidth, imageSizeHeight] = img.size

    #Check if image is wider than taller
    if (imageSizeWidth > imageSizeHeight):
        print("Wider than height %dx%d" % (imageSizeWidth, imageSizeHeight))
        #always scale images to MAX_PIXL_SIZE
        scale_height = round((imageSizeHeight/imageSizeWidth)*MAX_PIXL_SIZE)
        scale_width = MAX_PIXL_SIZE
    else:
        print("Higher than wide %dx%d" % (imageSizeWidth, imageSizeHeight))
        #always scale images to MAX_PIXL_SIZE
        scale_height = MAX_PIXL_SIZE
        scale_width = round((imageSizeWidth/imageSizeHeight)*MAX_PIXL_SIZE)

    print("Scaled height %d" % (scale_height))
    print("Scaled width %d" % (scale_width))

    nomad_image = ImageTk.PhotoImage(img.resize((scale_width, scale_height)))

    my_canvas.create_image(0,0,image=nomad_image, anchor='nw')
    
def update_fe(input_img_URI):
    global nomad_image

    response = requests.get(input_img_URI)
    img = Image.open(BytesIO(response.content))

    #Resize images to MAX_PIXL_SIZE
    [imageSizeWidth, imageSizeHeight] = img.size

    #Check if image is wider than taller
    if (imageSizeWidth > imageSizeHeight):
        print("Wider than height %dx%d" % (imageSizeWidth, imageSizeHeight))
        #always scale images to MAX_PIXL_SIZE
        scale_height = round((imageSizeHeight/imageSizeWidth)*MAX_PIXL_SIZE)
        scale_width = MAX_PIXL_SIZE
    else:
        print("Higher than wide %dx%d" % (imageSizeWidth, imageSizeHeight))
        #always scale images to MAX_PIXL_SIZE
        scale_height = MAX_PIXL_SIZE
        scale_width = round((imageSizeWidth/imageSizeHeight)*MAX_PIXL_SIZE)

    print("Scaled height %d" % (scale_height))
    print("Scaled width %d" % (scale_width))

    nomad_image = ImageTk.PhotoImage(img.resize((scale_width, scale_height)))

    my_canvas.create_image(0,0,image=nomad_image, anchor='nw')

initialise_fe(splashscreen)
mainloop()