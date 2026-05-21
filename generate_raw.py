import os
import subprocess

root_dir = "/Users/achyuthkp/Projects/digitalBanking"

output = []

output.append("### Step 1 Output")
find_cmd = "find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.next/*' -not -path '*/dist/*' -not -path '*/.cache/*' | sort"
try:
    find_res = subprocess.check_output(find_cmd, shell=True, cwd=root_dir).decode("utf-8")
    output.append(find_res)
except Exception as e:
    output.append(str(e))

output.append("### Step 2 Output")
try:
    with open(os.path.join(root_dir, "package.json"), "r") as f:
        output.append(f.read())
except Exception as e:
    output.append(str(e))

output.append("### Step 3 Output")
valid_dirs = ["src", "app", "components", "lib", "hooks", "utils", "types", "styles", "pages"]
valid_exts = [".tsx", ".ts", ".jsx", ".js", ".css", ".scss"]

for root, dirs, files in os.walk(root_dir):
    rel_root = os.path.relpath(root, root_dir)
    # Filter dirs
    dirs[:] = [d for d in dirs if d not in ["node_modules", ".git", ".next", "dist", ".cache"]]
    
    parts = set(rel_root.split(os.sep))
    for file in sorted(files):
        ext = os.path.splitext(file)[1]
        if ext in valid_exts:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, root_dir)
            
            # Check if it's inside one of the valid dirs
            if any(vd in rel_path.split(os.sep) for vd in valid_dirs):
                output.append(f"========== {rel_path} ==========")
                try:
                    with open(full_path, "r") as f:
                        output.append(f.read().strip())
                except Exception as e:
                    output.append(str(e))
                output.append("")

with open(os.path.join(root_dir, "direct_output.txt"), "w") as f:
    f.write("\n".join(output))
