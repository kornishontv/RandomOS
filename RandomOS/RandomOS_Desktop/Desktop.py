import moderngl_window as mglw
from os import system
import pyautogui as ptg
from screeninfo import get_monitors
class app(mglw.WindowConfig):
	w = h = 0
	for m in get_monitors():
		w += m.width
		h += m.height
	window_size = w, h
	resource_dir = "./"
	def __init__(self, **kwargs):
		super().__init__(**kwargs)
		ptg.press("f11")
		self.quad = mglw.geometry.quad_fs()
		self.prog = self.load_program(vertex_shader = "shader.vert", fragment_shader = "shader.frag")
		self.set_uniform("resolution", (self.w, self.h))
	def set_uniform(self, u_name, u_res):
		try:
			self.prog[u_name] = u_res
		except KeyError:
			print(f"{u_name} uniform not used in shader...")
	def render(self, time, ft):
		self.ctx.clear()
		self.set_uniform("mouseposno", ptg.position())
		self.quad.render(self.prog)
mglw.run_window_config(app)
