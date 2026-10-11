
CHECK='<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>'
ALERT='<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
def status(kind):
    if kind=="Successful":
        return f'<span class="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">{CHECK}Successful</span>'
    if kind=="Warning":
        return f'<span class="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">{ALERT}Warning</span>'
    return f'<span class="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{ALERT}Danger</span>'
def avatar(name,src):
    return f'<img class="shrink-0 inline-block size-6 rounded-full" src="{src}" alt="Avatar"><span class="text-sm text-foreground">{name}</span>'
def initial(name):
    return f'<span class="flex shrink-0 justify-center items-center size-6 bg-surface-2 text-xs font-medium text-foreground-inverse rounded-full">{name[0]}</span><span class="text-sm text-foreground">{name}</span>'
CHRISTINA="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
DAVID="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
SAMIA="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
BRIAN="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
ROWS=[
 ("Streamlab","Christina Bersh",avatar("Christina Bersh",CHRISTINA),"Successful","28 Dec, 12:12"),
 ("Node","David Harrison",avatar("David Harrison",DAVID),"Warning","20 Dec, 09:27"),
 ("FrontMail","Anne Richard",initial("Anne Richard"),"Successful","18 Dec, 15:20"),
 ("MobileAPI","Samia Kartoon",avatar("Samia Kartoon",SAMIA),"Successful","18 Dec, 15:20"),
 ("RachelsKey","David Harrison",initial("David Harrison"),"Danger","15 Dec, 14:41"),
 ("Gulp","Brian Halligan",avatar("Brian Halligan",BRIAN),"Successful","11 Dec, 18:51"),
]
def row(i, rec):
    name,creator,creatorHtml,kind,created = rec
    return f"""<tr class="bg-layer hover:bg-layer-hover">
  <td class="size-px whitespace-nowrap"><div class="px-6 py-2"><div class="flex items-center"><div class="flex items-center h-5"><input id="hs-table-checkbox-{i}" name="hs-table-checkbox" type="checkbox" class="shrink-0 border-line-3 rounded-sm shadow-2xs text-primary focus:ring-0 focus:ring-offset-0 checked:bg-primary-checked checked:border-primary-checked disabled:opacity-50 disabled:pointer-events-none"></div></div></div></td>
  <td class="size-px whitespace-nowrap"><a class="block relative z-10" href="#"><div class="px-6 py-2"><div class="block text-sm text-primary decoration-2 hover:underline">{name}</div></div></a></td>
  <td class="size-px whitespace-nowrap"><a class="block relative z-10" href="#"><div class="px-6 py-2"><div class="inline-flex items-center gap-x-2">{creatorHtml}</div></div></a></td>
  <td class="size-px whitespace-nowrap"><div class="px-6 py-2"><button type="button" class="py-1 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-layer-line bg-layer text-layer-foreground shadow-2xs hover:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-focus">Copy Key<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg></button></div></td>
  <td class="size-px whitespace-nowrap"><a class="block relative z-10" href="#"><div class="px-6 py-2">{status(kind)}</div></a></td>
  <td class="size-px whitespace-nowrap"><a class="block relative z-10" href="#"><div class="px-6 py-2"><div class="block text-sm text-muted-foreground-1">{created}</div></div></a></td>
  <td class="size-px whitespace-nowrap"><div class="px-6 py-2"><div class="hs-dropdown [--placement:bottom-right] relative inline-block"><button id="hs-table-dropdown-{i}" type="button" class="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-foreground align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-primary-focus transition-all text-sm" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown"><svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg></button><div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-40 z-20 bg-dropdown border border-dropdown-line divide-y divide-dropdown-divider shadow-2xl rounded-lg p-2" role="menu" aria-orientation="vertical" aria-labelledby="hs-table-dropdown-{i}"><div class="py-2 first:pt-0 last:pb-0"><span class="block py-2 px-3 text-xs font-medium uppercase text-muted-foreground">Actions</span><a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus" href="#">Rename</a><a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus" href="#">Regenrate Key</a><a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-dropdown-item-foreground hover:bg-dropdown-item-hover focus:outline-hidden focus:bg-dropdown-item-focus" href="#">Disable</a></div><div class="py-2 first:pt-0 last:pb-0"><a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-destructive hover:bg-destructive-hover/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-destructive-focus/10" href="#">Delete</a></div></div></div></div></td>
</tr>"""
SORT='<svg class="shrink-0 size-3.5 text-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>'
def th(label):
    return f'<th scope="col" class="px-6 py-3 text-start"><a class="group inline-flex items-center gap-x-2 text-xs font-semibold uppercase text-foreground hover:text-muted-foreground-1 focus:outline-hidden focus:text-muted-foreground-1" href="#">{label}{SORT}</a></th>'
head=open('scripts/tmp/apikey-head.txt').read()
rows='\n'.join('              '+row(i+1,r) for i,r in enumerate(ROWS))
foot=open('scripts/tmp/apikey-foot.txt').read()
html=head+rows+'\n'+foot
open('public/blocks/admin-api-key-table.html','w').write(html)
print("written", len(html), "bytes")
from html.parser import HTMLParser
VOID={'br','hr','img','input','meta','link','path','circle','rect','polyline','line','use','source'}
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.stack=[]; s.errs=[]
    def handle_starttag(s,t,a):
        if t not in VOID: s.stack.append(t)
    def handle_endtag(s,t):
        if t in VOID: return
        if s.stack and s.stack[-1]==t: s.stack.pop()
        else: s.errs.append(f"mismatch </{t}> at {s.getpos()}")
p=P(); p.feed(html)
print("ERRORS:", p.errs[:5] or "none", "| unclosed:", p.stack or "none")
